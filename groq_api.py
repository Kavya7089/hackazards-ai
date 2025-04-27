import os
import requests
from dotenv import load_dotenv
from transformers import AutoProcessor
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch

# Load .env variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL_NAME = "meta-llama/llama-4-scout-17b-16e-instruct"
GOOGLE_MAPS_API_KEY = "AIzaSyBPj5Sy3i_6R13rPLJxFhngFd0Te_n7BzE"



# -------------------- Generic Groq Chat Request --------------------
def ask_groq(prompt):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": MODEL_NAME,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content']
    except Exception as e:
        return f"❌ Error calling Groq API: {e}"


# -------------------- Image Captioning --------------------
def image_to_caption(image_file):
    processor = AutoProcessor.from_pretrained("Salesforce/blip-image-captioning-base", use_fast=True)

    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
    image = Image.open(image_file).convert('RGB')

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    inputs = processor(image, return_tensors="pt").to(device)

    out = model.generate(**inputs)
    return processor.decode(out[0], skip_special_tokens=True)


# -------------------- Translation --------------------
def translate_text(text, target_language):
    prompt = f"Translate the following text to {target_language}:\n\n{text}"
    return ask_groq(prompt)


# -------------------- Full Travel Info --------------------
def get_place_info(place):
    prompt = f"Give a complete travel guide about {place} including:\n- Best hotels\n- Tourist attractions\n- Popular food spots\n- Travel routes and tips"
    return ask_groq(prompt)


# -------------------- Tourist Attractions --------------------
def get_places(place):
    prompt = (
        f"Only return raw JSON, nothing else. List 6 famous places in {place}:\n"
        f"[{{\"name\": \"place name\", \"type\": \"Park\",\"location\": \"City Area\" \"rating\": \"4.6\", "
        f"\"description\": \"Nice place.\", "
        f"\"reviews\": \"list of 5-6 reviews of peoples\", "
        f"\"locationURL\": \"URL\"}}, ...]"
    )
    return ask_groq(prompt)


# -------------------- Shopping Places --------------------
def get_shopping_places(place):
    prompt = (
        f"Only return raw JSON, nothing else. List 6 shopping places in {place}:\n"
        f"[{{\"name\": \"Shop Name\", \"type\": \"Market\", \"location\": \"City Area\", \"rating\": \"4.3\", "
        f"\"description\": \"Great local market.\", "
        f"\"reviews\": [\"Amazing place!\", \"Loved the variety of shops.\", \"Affordable prices.\"], "
        f"\"locationURL\": \"https://maps.google.com/?q=Shop+Name\"}}, ...]"
    )
    return ask_groq(prompt)


# -------------------- Hotels --------------------
def get_hotels(place):
    prompt = (
        f"Only return raw JSON, nothing else. List 6 hotels in {place}:\n"
        f"[{{\"name\": \"Hotel Name\", \"location\": \"City Area\", \"rating\": \"4.5\", "
        f"\"price\": \"$100/night\", \"amenities\": [\"WiFi\", \"Pool\"], "
        f"\"reviews\": \"list of 2-3 reviews of peoples \", "
        f"\"locationURL\": \"URL\", "
        f"\"description\": \"Luxury hotel with great views.\"}},...]"
    )
    return ask_groq(prompt)

