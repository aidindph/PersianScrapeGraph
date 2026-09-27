"""
این ماژول wrapperهای LLM (مانند DeepSeek، MiniMax، XAI و…) و فرادادهٔ مدل‌های
مورد استفاده در ScrapeGraphAI را در اختیار می‌گذارد.
"""

from .atlascloud import AtlasCloud
from .cheaperinference import CheaperInference
from .clod import CLoD
from .deepseek import DeepSeek
from .minimax import MiniMax
from .nvidia import Nvidia
from .oneapi import OneApi
from .openai_itt import OpenAIImageToText
from .openai_tts import OpenAITextToSpeech
from .xai import XAI

__all__ = ["AtlasCloud", "CheaperInference", "DeepSeek", "MiniMax", "OneApi", "OpenAIImageToText", "OpenAITextToSpeech", "CLoD", "XAI", "Nvidia"]
