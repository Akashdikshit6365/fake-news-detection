const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const DEMO_MODE = true;

export interface PredictionResponse {
  input_text: string;
  prediction: 'REAL' | 'FAKE' | 'UNSURE';
  confidence: number;
  credibility_score: number;
  url?: string;
  filename?: string;
}

export interface HealthResponse {
  status: string;
}

export interface ChatAnalysisResponse {
  prediction: 'REAL' | 'FAKE' | 'UNSURE';
  confidence: number;
  reasoning: string;
  risk_factors: string[];
  trust_indicators: string[];
}

export interface ChatFollowUpResponse {
  answer: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const suspiciousTerms = ['shocking', 'secret', 'hoax', 'miracle', 'cover-up', 'exposed', 'viral', 'must share'];
const trustedTerms = ['reuters', 'associated press', 'official statement', 'study', 'report', 'research', 'confirmed', 'bbc', 'who'];

const normalizeScore = (value: number) => Math.min(96, Math.max(54, value));

const analyzeInput = (rawInput: string) => {
  const input = rawInput.toLowerCase();
  const suspiciousHits = suspiciousTerms.filter((term) => input.includes(term)).length;
  const trustedHits = trustedTerms.filter((term) => input.includes(term)).length;
  const lengthBoost = Math.min(8, Math.floor(rawInput.length / 120));
  const credibility = normalizeScore(68 + trustedHits * 9 - suspiciousHits * 11 + lengthBoost);

  let prediction: PredictionResponse['prediction'] = 'UNSURE';
  if (credibility >= 80) prediction = 'REAL';
  if (credibility <= 64) prediction = 'FAKE';

  const confidence = prediction === 'UNSURE'
    ? normalizeScore(64 + trustedHits * 4 - suspiciousHits * 3)
    : normalizeScore(74 + trustedHits * 5 - suspiciousHits * 4);

  return { prediction, confidence, credibility };
};

const buildSummary = (source: string, type: 'text' | 'url' | 'image') => {
  if (type === 'url') {
    return `The article from ${source} shows a mix of source authority, claim intensity, and wording patterns. This demo response mirrors how the live API would summarize extracted article text before classifying it.`;
  }

  if (type === 'image') {
    return `The uploaded image appears to contain headline-style text. This demo OCR summary simulates extracting the main caption and evaluating whether the language is evidence-based or emotionally manipulative.`;
  }

  return 'This content was reviewed for loaded language, credibility cues, and consistency. The demo engine simulates the production classifier so clients can understand the output format and confidence scoring.';
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async checkHealth(): Promise<HealthResponse> {
    if (DEMO_MODE) {
      await delay(250);
      return { status: 'demo' };
    }

    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) throw new Error(`Health check failed: ${response.statusText}`);
    return response.json();
  }

  async predictText(text: string): Promise<PredictionResponse> {
    if (DEMO_MODE) {
      await delay(900);
      const { prediction, confidence, credibility } = analyzeInput(text);
      return {
        input_text: text,
        prediction,
        confidence,
        credibility_score: credibility,
      };
    }

    const response = await fetch(`${this.baseUrl}/predict/text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input_text: text }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Prediction failed: ${response.statusText}`);
    }
    return response.json();
  }

  async predictUrl(url: string): Promise<PredictionResponse> {
    if (DEMO_MODE) {
      await delay(1100);
      const syntheticArticle = `Source review for ${url}. Official report cites expert commentary, publication details, and supporting references.`;
      const { prediction, confidence, credibility } = analyzeInput(`${url} ${syntheticArticle}`);
      return {
        input_text: `${buildSummary(url, 'url')} ${syntheticArticle}`,
        prediction,
        confidence,
        credibility_score: credibility,
        url,
      };
    }

    const response = await fetch(`${this.baseUrl}/predict/url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input_url: url }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Prediction failed: ${response.statusText}`);
    }
    return response.json();
  }

  async predictImage(file: File): Promise<PredictionResponse> {
    if (DEMO_MODE) {
      await delay(1200);
      const extractedText = `${file.name} headline scan. Officials confirmed the claim after a public report and supporting research citations.`;
      const { prediction, confidence, credibility } = analyzeInput(extractedText);
      return {
        input_text: `${buildSummary(file.name, 'image')} ${extractedText}`,
        prediction,
        confidence,
        credibility_score: credibility,
        filename: file.name,
      };
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/predict/image`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Prediction failed: ${response.statusText}`);
    }
    return response.json();
  }

  async analyzeChatContent(content: string): Promise<ChatAnalysisResponse> {
    if (DEMO_MODE) {
      await delay(1000);
      const { prediction, confidence } = analyzeInput(content);
      return {
        prediction,
        confidence,
        reasoning: prediction === 'FAKE'
          ? 'The content leans on sensational phrasing and thin attribution, which usually lowers trust.'
          : prediction === 'REAL'
            ? 'The content includes source-style signals, measured wording, and fewer manipulation cues.'
            : 'The signals are mixed, so the safest output is a cautious review rather than a hard verdict.',
        risk_factors: prediction === 'FAKE'
          ? ['Sensational wording', 'Low evidence density', 'Potential virality bait']
          : prediction === 'UNSURE'
            ? ['Incomplete sourcing', 'Mixed language signals']
            : [],
        trust_indicators: prediction === 'REAL'
          ? ['Source-like wording', 'Evidence cues', 'Lower emotional framing']
          : ['Requires manual verification'],
      };
    }

    const response = await fetch(`${this.baseUrl}/predict/text/groq`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input_text: content }),
    });
    if (!response.ok) throw new Error(`Analysis failed: ${response.statusText}`);
    return response.json();
  }

  async chatAboutContent(content: string, question: string): Promise<ChatFollowUpResponse> {
    if (DEMO_MODE) {
      await delay(800);
      const { prediction, credibility } = analyzeInput(content);
      return {
        answer: `Demo assistant summary: based on this sample, the content trends ${prediction.toLowerCase()} with a credibility score near ${credibility}. For "${question}", the recommended next step is to verify the original publisher, look for named evidence, and compare the claim with at least two reputable outlets before trusting it.`,
      };
    }

    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, question }),
    });
    if (!response.ok) throw new Error(`Chat failed: ${response.statusText}`);
    return response.json();
  }
}

export const apiClient = new ApiClient();
