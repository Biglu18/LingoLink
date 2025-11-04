import os
import tempfile
import speech_recognition as sr
from googletrans import Translator
from gtts import gTTS

def process_audio(file, src_lang, dest_lang):
    try:
        # Save uploaded audio temporarily
        temp_input = tempfile.NamedTemporaryFile(delete=False, suffix='.wav')
        file.save(temp_input.name)

        # Step 1: Speech to text
        recognizer = sr.Recognizer()
        with sr.AudioFile(temp_input.name) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data, language=src_lang)

        # Step 2: Translate text
        translator = Translator()
        translated_text = translator.translate(text, src=src_lang, dest=dest_lang).text

        # Step 3: Convert translated text to speech
        tts = gTTS(translated_text, lang=dest_lang)
        output_path = os.path.join(tempfile.gettempdir(), "translated_audio.mp3")
        tts.save(output_path)

        # Cleanup temp input
        os.remove(temp_input.name)

        return output_path

    except Exception as e:
        print("Error in process_audio:", e)
        return None
