
        // --- Global State and Constants ---
        const INITIAL_PRICE = 50.00;
        const INITIAL_BALANCE = 10000.00;
        const UPDATE_INTERVAL_MS = 1000; // 1 second
        const PRICE_HISTORY_LENGTH = 30;

        let portfolio = {
            usdBalance: INITIAL_BALANCE,
            gmcHoldings: 0.0,
        };
        let currentPrice = INITIAL_PRICE;
        let lastPrice = INITIAL_PRICE;
        let transactions = [];
        let priceHistory = Array(PRICE_HISTORY_LENGTH).fill(INITIAL_PRICE);

        // --- DOM Element References ---
        const elements = {
            usdBalance: document.getElementById('usdBalance'),
            gmcHoldings: document.getElementById('gmcHoldings'),
            totalValue: document.getElementById('totalValue'),
            currentPrice: document.getElementById('currentPrice'),
            priceChange: document.getElementById('priceChange'),
            tradeAmount: document.getElementById('tradeAmount'),
            costDisplay: document.getElementById('costDisplay'),
            buyBtn: document.getElementById('buyBtn'),
            sellBtn: document.getElementById('sellBtn'),
            messageBox: document.getElementById('messageBox'),
            transactionTableBody: document.getElementById('transactionTableBody'),
            noTransactions: document.getElementById('noTransactions'),
            priceHistoryDiv: document.getElementById('priceHistory'),
        };

        // --- Utility Functions ---

        /** Formats a number to USD currency string. */
        const formatUSD = (num) => `$${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

        /** Formats a number to GMC amount string. */
        const formatGMC = (num) => `${num.toFixed(4)} GMC`;

        /** Displays a temporary message to the user. */
        function displayMessage(message, type = 'yellow') {
            elements.messageBox.textContent = message;
            // Uses Tailwind/custom classes (text-red-400 or text-yellow-300) instead of inline styles
            elements.messageBox.className = `text-center text-sm font-medium transition-colors duration-300 min-h-[1.5rem] ${type === 'error' ? 'text-red-400' : 'text-yellow-300'}`;
            setTimeout(() => {
                elements.messageBox.textContent = '';
            }, 3000);
        }

        // --- Rendering Functions ---

        /** Updates the visual history bar chart. */
        function renderPriceHistory() {
            elements.priceHistoryDiv.innerHTML = '';
            const minPrice = Math.min(...priceHistory);
            const maxPrice = Math.max(...priceHistory);
            const range = maxPrice - minPrice;

            priceHistory.forEach(price => {
                // Calculate dynamic height percentage
                const heightPercentage = range > 0 ? ((price - minPrice) / range) * 90 + 10 : 50; 
                
                const bar = document.createElement('div');
                
                // 1. Assign the base styling class
                let barClass = 'price-bar';

                // 2. Add the dynamic color class based on price movement (replacing inline color logic)
                if (price === currentPrice) {
                    barClass += ' bar-current';
                } else if (price > lastPrice) {
                    barClass += ' bar-up';
                } else {
                    barClass += ' bar-down';
                }

                // Apply classes
                bar.className = barClass;

                // 3. Set the dynamic style (height). This remains inline because the height 
                // is a calculated percentage (e.g., 63.45%) and cannot be assigned by a 
                // static CSS class or Tailwind utility.
                bar.style.height = `${heightPercentage}%`; 

                elements.priceHistoryDiv.appendChild(bar);
            });
        }

        /** Updates all portfolio and market display elements. */
        function renderUI() {
            const totalValueUSD = portfolio.usdBalance + (portfolio.gmcHoldings * currentPrice);
            const priceChangePercent = ((currentPrice - INITIAL_PRICE) / INITIAL_PRICE) * 100;
            const priceDirectionClass = currentPrice >= lastPrice ? 'price-up' : 'price-down';

            // Update Price Ticker
            elements.currentPrice.textContent = formatUSD(currentPrice);
            elements.currentPrice.className = `text-4xl font-mono transition-colors duration-500 ${priceDirectionClass}`;
            
            elements.priceChange.textContent = `${priceChangePercent.toFixed(2)}%`;
            elements.priceChange.className = `text-xl font-bold transition-colors duration-500 ${priceDirectionClass}`;

            // Update Portfolio
            elements.usdBalance.textContent = formatUSD(portfolio.usdBalance);
            elements.gmcHoldings.textContent = formatGMC(portfolio.gmcHoldings);
            elements.totalValue.textContent = formatUSD(totalValueUSD);

            // Update Trade Panel
            const amount = parseFloat(elements.tradeAmount.value) || 0;
            elements.costDisplay.textContent = `Cost/Proceeds: ${formatUSD(amount * currentPrice)}`;

            // Render History
            renderTransactionHistory();
            
            // Render Chart
            renderPriceHistory();
        }

        /** Renders the transaction history table. */
        function renderTransactionHistory() {
            elements.transactionTableBody.innerHTML = '';

            if (transactions.length === 0) {
                elements.noTransactions.classList.remove('hidden');
                return;
            }
            elements.noTransactions.classList.add('hidden');

            // Show latest 10 transactions
            transactions.slice(0, 10).forEach(tx => {
                const tr = document.createElement('tr');
                const valueUSD = tx.amount * tx.price;
                const typeClass = tx.type === 'BUY' ? 'text-green-400' : 'text-red-400';

                tr.className = 'border-b border-gray-800 hover:bg-gray-800/50 transition duration-150';
                tr.innerHTML = `
                    <td class="py-2 px-2 text-left text-gray-500">${new Date(tx.timestamp).toLocaleTimeString()}</td>
                    <td class="py-2 px-2 text-left font-semibold ${typeClass}">${tx.type}</td>
                    <td class="py-2 px-2 text-right">${formatGMC(tx.amount)}</td>
                    <td class="py-2 px-2 text-right text-gray-400">${formatUSD(tx.price)}</td>
                    <td class="py-2 px-2 text-right font-bold">${formatUSD(valueUSD)}</td>
                `;
                elements.transactionTableBody.appendChild(tr);
            });
        }

        // --- Simulation Logic ---

        /** Simulates a random price update for the GMC coin. */
        function updatePrice() {
            lastPrice = currentPrice;
            
            // Apply a small random movement (random walk)
            const volatility = 0.005; // 0.5% max change per second
            const changePercent = (Math.random() * volatility * 2) - volatility; // range [-volatility, +volatility]
            currentPrice *= (1 + changePercent);
            
            // Keep price from going negative (though unlikely with this model)
            currentPrice = Math.max(0.01, currentPrice);

            // Update price history array
            priceHistory.push(currentPrice);
            if (priceHistory.length > PRICE_HISTORY_LENGTH) {
                priceHistory.shift(); // Remove oldest entry
            }

            renderUI();
        }

        // --- Trading Logic ---

        /** Executes a buy order. */
        function buyGMC() {
            const amount = parseFloat(elements.tradeAmount.value);
            if (isNaN(amount) || amount <= 0) {
                return displayMessage("Please enter a valid amount.", 'error');
            }

            const cost = amount * currentPrice;

            if (cost > portfolio.usdBalance) {
                return displayMessage("Insufficient USD balance.", 'error');
            }

            portfolio.usdBalance -= cost;
            portfolio.gmcHoldings += amount;

            transactions.unshift({
                timestamp: Date.now(),
                type: 'BUY',
                amount: amount,
                price: currentPrice
            });

            elements.tradeAmount.value = 1; // Reset input
            displayMessage(`Successfully bought ${formatGMC(amount)} at ${formatUSD(currentPrice)}!`);
            renderUI();
        }

        /** Executes a sell order. */
        function sellGMC() {
            const amount = parseFloat(elements.tradeAmount.value);
            if (isNaN(amount) || amount <= 0) {
                return displayMessage("Please enter a valid amount.", 'error');
            }

            if (amount > portfolio.gmcHoldings) {
                return displayMessage("Insufficient GMC holdings.", 'error');
            }

            const proceeds = amount * currentPrice;

            portfolio.usdBalance += proceeds;
            portfolio.gmcHoldings -= amount;

            transactions.unshift({
                timestamp: Date.now(),
                type: 'SELL',
                amount: amount,
                price: currentPrice
            });

            elements.tradeAmount.value = 1; // Reset input
            displayMessage(`Successfully sold ${formatGMC(amount)} at ${formatUSD(currentPrice)}!`);
            renderUI();
        }

        // --- Initialization ---

        window.onload = function() {
            // Initial render
            renderUI();

            // Set up event listeners
            elements.buyBtn.addEventListener('click', buyGMC);
            elements.sellBtn.addEventListener('click', sellGMC);
            elements.tradeAmount.addEventListener('input', renderUI);

            // Start the price simulation loop
            setInterval(updatePrice, UPDATE_INTERVAL_MS);
        }

    