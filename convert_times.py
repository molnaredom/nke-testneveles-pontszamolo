import re
import os

def convert_time_value(value):
    """
    Convert incorrect decimal time format to minutes and seconds.
    19.1 -> { minutes: 19, seconds: 10 }
    19.05 -> { minutes: 19, seconds: 5 }
    16.57 -> { minutes: 16, seconds: 57 }
    """
    str_value = str(value)
    parts = str_value.split('.')
    
    if len(parts) == 2:
        minutes = int(parts[0])
        seconds = int(parts[1])
        return {"minutes": minutes, "seconds": seconds}
    else:
        return {"minutes": int(value), "seconds": 0}

def process_file(filepath):
    """Process a TypeScript file and convert time values"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all exercise blocks with unit: "perc:mp" and convert their data arrays
    def replace_exercise_block(match):
        full_block = match.group(0)
        unit_match = re.search(r'unit:\s*["\']perc:mp["\']', full_block)
        
        if not unit_match:
            return full_block
        
        # Find the data array within this block
        data_match = re.search(r'data:\s*\[(.*?)\](?=\s*[},])', full_block, re.DOTALL)
        if not data_match:
            return full_block
        
        data_content = data_match.group(1)
        
        # Replace all { value: X, points: Y } with converted format
        value_pattern = r'\{\s*value:\s*([\d.]+),\s*points:\s*(\d+)\s*\}'
        
        def replace_value(value_match):
            old_value = float(value_match.group(1))
            points = value_match.group(2)
            
            # Convert to minutes and seconds
            time_obj = convert_time_value(old_value)
            
            return f"{{ value: {{ minutes: {time_obj['minutes']}, seconds: {time_obj['seconds']} }}, points: {points} }}"
        
        new_data_content = re.sub(value_pattern, replace_value, data_content)
        new_block = full_block.replace(data_content, new_data_content)
        
        return new_block
    
    # Match exercise blocks with perc:mp unit
    exercise_pattern = r'\w+:\s*\{[^}]*unit:\s*["\']perc:mp["\'][^}]*data:\s*\[.*?\]\s*[},]'
    new_content = re.sub(exercise_pattern, replace_exercise_block, content, flags=re.DOTALL)
    
    # Write back to file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✓ Processed: {filepath}")

def main():
    base_path = r"c:\Users\bence\Documents\GitHub\nke-testneveles-pontszamolo\src\data"
    
    files = [
        os.path.join(base_path, "exercises-female.ts"),
        os.path.join(base_path, "exercises-male.ts")
    ]
    
    for filepath in files:
        if os.path.exists(filepath):
            print(f"\nProcessing {os.path.basename(filepath)}...")
            process_file(filepath)
        else:
            print(f"✗ File not found: {filepath}")
    
    print("\n✓ Conversion complete!")
    print("\nExample conversions:")
    print("19.1  -> { value: { minutes: 19, seconds: 10 }, points: 1 }")
    print("19.05 -> { value: { minutes: 19, seconds: 5 }, points: 2 }")
    print("16.57 -> { value: { minutes: 16, seconds: 57 }, points: 27 }")

if __name__ == "__main__":
    main()
