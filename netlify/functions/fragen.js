export default async (req) => {
    try {
        const { prompt } = await req.json();

        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 300,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await res.json();
        
        return new Response(JSON.stringify({ 
            reply: data.content[0].text 
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500
        });
    }
};
