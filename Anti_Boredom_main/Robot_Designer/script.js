// Robot Designer JavaScript
class RobotDesigner {
    constructor() {
        this.robotConfig = {
            head: {
                type: 'round',
                color: '#4CAF50'
            },
            body: {
                type: 'rectangular',
                color: '#2196F3'
            },
            arms: {
                type: 'straight',
                color: '#FF9800'
            },
            legs: {
                type: 'straight',
                color: '#9C27B0'
            },
            size: 1,
            rotation: 0
        };

        this.defaultConfig = { ...this.robotConfig };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateRobotPreview();
        this.loadSavedDesign();
    }

    setupEventListeners() {
        // Part selection buttons
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const part = e.target.dataset.part;
                const option = e.target.dataset.option;
                this.selectPart(part, option);
            });
        });

        // Color pickers
        document.getElementById('head-color').addEventListener('change', (e) => {
            this.updateColor('head', e.target.value);
        });

        document.getElementById('body-color').addEventListener('change', (e) => {
            this.updateColor('body', e.target.value);
        });

        document.getElementById('arms-color').addEventListener('change', (e) => {
            this.updateColor('arms', e.target.value);
        });

        document.getElementById('legs-color').addEventListener('change', (e) => {
            this.updateColor('legs', e.target.value);
        });

        // Size and rotation sliders
        document.getElementById('robot-size').addEventListener('input', (e) => {
            this.updateSize(parseFloat(e.target.value));
            document.getElementById('size-value').textContent = Math.round(e.target.value * 100) + '%';
        });

        document.getElementById('robot-rotation').addEventListener('input', (e) => {
            this.updateRotation(parseInt(e.target.value));
            document.getElementById('rotation-value').textContent = e.target.value + '°';
        });

        // Action buttons
        document.getElementById('save-robot').addEventListener('click', () => {
            this.saveDesign();
        });

        document.getElementById('load-robot').addEventListener('click', () => {
            this.loadDesign();
        });

        document.getElementById('reset-robot').addEventListener('click', () => {
            this.resetToDefault();
        });
    }

    selectPart(part, option) {
        // Update config
        this.robotConfig[part].type = option;

        // Update active button
        document.querySelectorAll(`[data-part="${part}"]`).forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-part="${part}"][data-option="${option}"]`).classList.add('active');

        // Update robot preview
        this.updateRobotPreview();
    }

    updateColor(part, color) {
        this.robotConfig[part].color = color;
        this.updateRobotPreview();
    }

    updateSize(size) {
        this.robotConfig.size = size;
        this.updateRobotPreview();
    }

    updateRotation(rotation) {
        this.robotConfig.rotation = rotation;
        this.updateRobotPreview();
    }

    updateRobotPreview() {
        const robot = document.getElementById('robot');
        
        // Add animation class
        robot.classList.add('robot-updating');
        
        // Update head
        const head = document.getElementById('robot-head');
        head.className = `robot-head ${this.robotConfig.head.type}`;
        head.style.backgroundColor = this.robotConfig.head.color;

        // Update body
        const body = document.getElementById('robot-body');
        body.className = `robot-body ${this.robotConfig.body.type}`;
        body.style.backgroundColor = this.robotConfig.body.color;

        // Update arms
        const leftArm = document.getElementById('robot-arm-left');
        const rightArm = document.getElementById('robot-arm-right');
        leftArm.className = `robot-arm robot-arm-left ${this.robotConfig.arms.type}`;
        rightArm.className = `robot-arm robot-arm-right ${this.robotConfig.arms.type}`;
        leftArm.style.backgroundColor = this.robotConfig.arms.color;
        rightArm.style.backgroundColor = this.robotConfig.arms.color;

        // Update legs
        const leftLeg = document.getElementById('robot-leg-left');
        const rightLeg = document.getElementById('robot-leg-right');
        leftLeg.className = `robot-leg robot-leg-left ${this.robotConfig.legs.type}`;
        rightLeg.className = `robot-leg robot-leg-right ${this.robotConfig.legs.type}`;
        leftLeg.style.backgroundColor = this.robotConfig.legs.color;
        rightLeg.style.backgroundColor = this.robotConfig.legs.color;

        // Update size and rotation
        robot.style.transform = `scale(${this.robotConfig.size}) rotate(${this.robotConfig.rotation}deg)`;

        // Remove animation class after animation completes
        setTimeout(() => {
            robot.classList.remove('robot-updating');
        }, 500);
    }

    saveDesign() {
        try {
            localStorage.setItem('robotDesign', JSON.stringify(this.robotConfig));
            this.showNotification('🤖 Robot design saved successfully!', 'success');
        } catch (error) {
            this.showNotification('❌ Failed to save design. Please try again.', 'error');
        }
    }

    loadDesign() {
        try {
            const savedDesign = localStorage.getItem('robotDesign');
            if (savedDesign) {
                this.robotConfig = JSON.parse(savedDesign);
                this.updateAllControls();
                this.updateRobotPreview();
                this.showNotification('📂 Robot design loaded successfully!', 'success');
            } else {
                this.showNotification('📂 No saved design found.', 'info');
            }
        } catch (error) {
            this.showNotification('❌ Failed to load design. Please try again.', 'error');
        }
    }

    loadSavedDesign() {
        try {
            const savedDesign = localStorage.getItem('robotDesign');
            if (savedDesign) {
                this.robotConfig = JSON.parse(savedDesign);
                this.updateAllControls();
                this.updateRobotPreview();
            }
        } catch (error) {
            console.log('No saved design found or error loading design');
        }
    }

    resetToDefault() {
        this.robotConfig = { ...this.defaultConfig };
        this.updateAllControls();
        this.updateRobotPreview();
        this.showNotification('🔄 Robot reset to default design!', 'info');
    }

    updateAllControls() {
        // Update color pickers
        document.getElementById('head-color').value = this.robotConfig.head.color;
        document.getElementById('body-color').value = this.robotConfig.body.color;
        document.getElementById('arms-color').value = this.robotConfig.arms.color;
        document.getElementById('legs-color').value = this.robotConfig.legs.color;

        // Update sliders
        document.getElementById('robot-size').value = this.robotConfig.size;
        document.getElementById('robot-rotation').value = this.robotConfig.rotation;
        document.getElementById('size-value').textContent = Math.round(this.robotConfig.size * 100) + '%';
        document.getElementById('rotation-value').textContent = this.robotConfig.rotation + '°';

        // Update active buttons
        Object.keys(this.robotConfig).forEach(part => {
            if (part !== 'size' && part !== 'rotation') {
                document.querySelectorAll(`[data-part="${part}"]`).forEach(btn => {
                    btn.classList.remove('active');
                });
                const activeBtn = document.querySelector(`[data-part="${part}"][data-option="${this.robotConfig[part].type}"]`);
                if (activeBtn) {
                    activeBtn.classList.add('active');
                }
            }
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        });

        // Set background color based on type
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            info: '#2196F3'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the robot designer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RobotDesigner();
});

// Add some fun interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add click effects to robot parts
    const robotParts = document.querySelectorAll('.robot-head, .robot-body, .robot-arm, .robot-leg');
    
    robotParts.forEach(part => {
        part.addEventListener('click', (e) => {
            e.target.style.transform = 'scale(1.1)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 200);
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 's':
                    e.preventDefault();
                    document.getElementById('save-robot').click();
                    break;
                case 'r':
                    e.preventDefault();
                    document.getElementById('reset-robot').click();
                    break;
                case 'l':
                    e.preventDefault();
                    document.getElementById('load-robot').click();
                    break;
            }
        }
    });

    // Add randomize button functionality
    const randomizeBtn = document.createElement('button');
    randomizeBtn.textContent = '🎲 Randomize';
    randomizeBtn.className = 'btn btn-secondary';
    randomizeBtn.style.marginTop = '10px';
    
    randomizeBtn.addEventListener('click', () => {
        const robotDesigner = window.robotDesigner || new RobotDesigner();
        
        // Randomize all parts
        const headTypes = ['round', 'square', 'triangular', 'hexagonal'];
        const bodyTypes = ['rectangular', 'oval', 'diamond', 'trapezoid'];
        const armTypes = ['straight', 'curved', 'jointed', 'mechanical'];
        const legTypes = ['straight', 'bent', 'jointed', 'wheels'];
        
        robotDesigner.robotConfig.head.type = headTypes[Math.floor(Math.random() * headTypes.length)];
        robotDesigner.robotConfig.body.type = bodyTypes[Math.floor(Math.random() * bodyTypes.length)];
        robotDesigner.robotConfig.arms.type = armTypes[Math.floor(Math.random() * armTypes.length)];
        robotDesigner.robotConfig.legs.type = legTypes[Math.floor(Math.random() * legTypes.length)];
        
        // Randomize colors
        robotDesigner.robotConfig.head.color = '#' + Math.floor(Math.random()*16777215).toString(16);
        robotDesigner.robotConfig.body.color = '#' + Math.floor(Math.random()*16777215).toString(16);
        robotDesigner.robotConfig.arms.color = '#' + Math.floor(Math.random()*16777215).toString(16);
        robotDesigner.robotConfig.legs.color = '#' + Math.floor(Math.random()*16777215).toString(16);
        
        // Randomize size and rotation
        robotDesigner.robotConfig.size = 0.7 + Math.random() * 0.6; // Between 0.7 and 1.3
        robotDesigner.robotConfig.rotation = Math.floor(Math.random() * 360);
        
        robotDesigner.updateAllControls();
        robotDesigner.updateRobotPreview();
        robotDesigner.showNotification('🎲 Robot randomized!', 'info');
    });
    
    document.querySelector('.action-buttons').appendChild(randomizeBtn);
});

// Export for potential external use
window.RobotDesigner = RobotDesigner;
