import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate code using OpenAI API
    Args: event with httpMethod, body (prompt, language)
    Returns: Generated code
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        import openai
    except ImportError:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'OpenAI package not installed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    prompt: str = body_data.get('prompt', '')
    language: str = body_data.get('language', 'python')
    
    if not prompt:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Prompt is required'})
        }
    
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'OpenAI API key not configured'})
        }
    
    client = openai.OpenAI(api_key=api_key)
    
    system_prompt = f"""You are an expert {language.upper()} developer. 
Generate clean, working, well-commented {language.upper()} code based on user requests.
Only return the code, no explanations or markdown formatting.
Make sure the code is syntactically correct and follows best practices."""
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=1500
    )
    
    generated_code = response.choices[0].message.content.strip()
    
    if generated_code.startswith('```'):
        lines = generated_code.split('\n')
        generated_code = '\n'.join(lines[1:-1]) if len(lines) > 2 else generated_code
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'code': generated_code,
            'language': language
        })
    }
