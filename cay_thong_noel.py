import random
import os

try:
    from colorama import init, Fore, Style
    init(autoreset=True)
    
    RED = Fore.RED
    GREEN = Fore.GREEN
    YELLOW = Fore.YELLOW
    BRIGHT_YELLOW = Style.BRIGHT + Fore.YELLOW
    BRIGHT_WHITE = Style.BRIGHT + Fore.WHITE
    RESET = Style.RESET_ALL
except ImportError:
    
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BRIGHT_YELLOW = '\033[1;93m'
    BRIGHT_WHITE = '\033[1;37m'
    RESET = '\033[0m'

def create_christmas_tree_with_effects(height):
   
    if height < 3:
        print("Chiều cao tối thiểu nên là 3.")
        return

    # Căn giữa Ngôi sao
    star_spacing = height - 2
    
    # Ngôi sao màu vàng sáng
    print(" " * star_spacing + f"{BRIGHT_YELLOW}🌟{RESET}") 

    # --- Vẽ Thân Cây (Lá) ---
    decoration_rate = 0.20 
    
    for i in range(1, height):
        num_leaves = 2 * i - 1
        leading_spaces = height - i
        
        leaf_row = "*" * num_leaves
        decorated_row = ""
        
        for char in leaf_row:
            if char == '*':
                if random.random() < decoration_rate:
                    # Hiệu ứng Nhấp nháy và Màu sắc cho đèn
                    
                    color = random.choice([RED, YELLOW, BRIGHT_WHITE])
                  
                    ornament = random.choice(['o', 'O']) 
                    
                    decorated_row += f"{color}{ornament}{RESET}"
                else:
                    # Lá cây màu xanh lục
                    decorated_row += f"{GREEN}{char}{RESET}"
            else:
                decorated_row += char
                
       
        print(" " * leading_spaces + decorated_row)

    # --- Vẽ Gốc Cây ---
    trunk_width = height // 3
    trunk_spacing = height - trunk_width // 2 - 1
    
    # Gốc cây màu nâu 
    BROWN = '\033[33m'
    
    for _ in range(height // 4 + 1): 
        print(" " * trunk_spacing + f"{BROWN}{'#' * trunk_width}{RESET}")


desired_height = 15
create_christmas_tree_with_effects(desired_height)
print(f"{YELLOW}{'\n-=-----MERRY CHRISTMAS!-----=-'}{RESET}")