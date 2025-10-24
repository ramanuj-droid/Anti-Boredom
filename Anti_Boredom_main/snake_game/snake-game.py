import pygame
import random

# Initialize Pygame
pygame.init()

# Set up display
window_width = 900
window_height = 600
play_area_width = 600
play_area_height = 400
margin_x = (window_width - play_area_width) // 2
margin_y = (window_height - play_area_height) // 2
border_margin = 30  # Minimum distance from the border

window = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption('Snake Game')

# Colors
black = (0, 0, 0)
white = (255, 255, 255)
red = (213, 50, 80)
border_color = (0, 0, 0)

# Snake properties
snake_block = 20
snake_speed = 8

# Clock
clock = pygame.time.Clock()

# Font
title_font = pygame.font.SysFont("Consolas", 30)
score_font = pygame.font.SysFont("Consolas", 20)
font_style = pygame.font.SysFont("Consolas", 25)
game_over_font = pygame.font.SysFont("Consolas", 50)

def display_score(score):
    value = score_font.render(f"Score: {score}", True, white)
    window.blit(value, [window_width / 2 - value.get_width() / 2, margin_y - 30])

def display_title():
    title = title_font.render('Snake Game', True, white)
    window.blit(title, [window_width / 2 - title.get_width() / 2, margin_y - 80])

def message(msg, color, font, position):
    mesg = font.render(msg, True, color)
    text_rect = mesg.get_rect(center=(window_width / 2, position))
    window.blit(mesg, text_rect)

def draw_snake(snake_block, snake_list):
    for x in snake_list:
        pygame.draw.circle(window, black, [int(x[0] + snake_block / 2), int(x[1] + snake_block / 2)], snake_block // 2)

def draw_food(x, y, radius, color):
    food_surface = pygame.Surface((radius * 2, radius * 2), pygame.SRCALPHA)
    pygame.draw.circle(food_surface, color, (radius, radius), radius)
    window.blit(food_surface, (x - radius, y - radius))

def place_food():
    foodx = round(random.randrange(margin_x + border_margin, margin_x + play_area_width - snake_block - border_margin) / 20.0) * 20.0
    foody = round(random.randrange(margin_y + border_margin, margin_y + play_area_height - snake_block - border_margin) / 20.0) * 20.0
    return foodx, foody

def gameLoop():
    game_over = False
    game_close = False

    # Initial snake position
    x1 = window_width / 2
    y1 = window_height / 2

    # Snake movement
    x1_change = 0
    y1_change = 0

    # Snake initial properties
    snake_list = []
    length_of_snake = 1

    # Food position
    foodx, foody = place_food()

    while not game_over:
        while game_close:
            window.fill(white)
            display_title()
            display_score(length_of_snake - 1)
            
            # Display "GAME OVER!" in larger font
            message("GAME OVER!", red, game_over_font, window_height / 2 - 60)
            
            # Display retry/quit message below "GAME OVER!"
            message("Press R to Retry or X to Quit", black, font_style, window_height / 2 + 30)
            
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_x:
                        game_over = True
                        game_close = False
                    if event.key == pygame.K_r:
                        gameLoop()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT and x1_change != snake_block:
                    x1_change = -snake_block
                    y1_change = 0
                elif event.key == pygame.K_RIGHT and x1_change != -snake_block:
                    x1_change = snake_block
                    y1_change = 0
                elif event.key == pygame.K_UP and y1_change != snake_block:
                    y1_change = -snake_block
                    x1_change = 0
                elif event.key == pygame.K_DOWN and y1_change != -snake_block:
                    y1_change = snake_block
                    x1_change = 0

        # Check for boundary collision within the play area
        if x1 >= margin_x + play_area_width or x1 < margin_x or y1 >= margin_y + play_area_height or y1 < margin_y:
            game_close = True

        x1 += x1_change
        y1 += y1_change
        window.fill(black)

        # Draw border
        pygame.draw.rect(window, border_color, [margin_x, margin_y, play_area_width, play_area_height], 2)
        
        # Draw play area
        pygame.draw.rect(window, white, [margin_x + 1, margin_y + 1, play_area_width - 2, play_area_height - 2])

        # Draw food
        draw_food(foodx + snake_block / 2, foody + snake_block / 2, snake_block // 2, red)

        # Update snake
        snake_head = [x1, y1]
        snake_list.append(snake_head)
        if len(snake_list) > length_of_snake:
            del snake_list[0]

        # Check for collision with itself
        for x in snake_list[:-1]:
            if x == snake_head:
                game_close = True

        draw_snake(snake_block, snake_list)
        display_title()
        display_score(length_of_snake - 1)

        pygame.display.update()

        # Check for food collision
        if x1 == foodx and y1 == foody:
            foodx, foody = place_food()
            length_of_snake += 1

        clock.tick(snake_speed)

    pygame.quit()
    quit()

gameLoop()