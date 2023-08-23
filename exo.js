import os
import requests

def get_weather_data(city_name):
    api_key = "YOUR_API_KEY"  # Replace with your actual API key
    base_url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": city_name, "appid": api_key, "units": "metric"}

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        temperature = data["main"]["temp"]
        return temperature
    else:
        print("Error retrieving weather data.")
        return None

def main():
    try:
        with open("input.txt", "r") as input_file:
            city_name = input_file.read().strip()

        if not city_name:
            print("City name not found in input.txt.")
            return

        temperature = get_weather_data(city_name)

        if temperature is not None:
            city_filename = f"{city_name}.txt"

            if os.path.exists(city_filename):
                os.remove(city_filename)

            with open(city_filename, "w") as output_file:
                output_file.write(f"The temperature in {city_name} is {temperature}°C.")
                print(f"Temperature data written to {city_filename}.")
        else:
            print("Unable to retrieve temperature data.")

    except FileNotFoundError:
        print("Input file not found.")
    except Exception as e:
        print("An error occurred:", e)

if __name__ == "__main__":
    main()
