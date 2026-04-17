export default async (req) => {
  try {
    const { prompt } = await req.json();

    // Wir rufen Gemini 1.5 Flash auf (schnell und kostenlos)
    const response = await fetch(https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    
    // Hier holen wir die Antwort aus dem Gemini-Format
    const aiResponse = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({
      reply: aiResponse
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
