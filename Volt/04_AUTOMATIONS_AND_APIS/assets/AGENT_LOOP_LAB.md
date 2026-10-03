---
generated: true
schema_version: 1
kind: "asset"
entity_id: "AGENT_LOOP_LAB"
curriculum_version: "2.2.0"
source_path: "content/labs/W03D13_AGENT_LOOP.py"
asset_kind: "exercise-code"
source_sha256: "c148eefc8fe6e3675be0e0da61ae22e7f6c91e6cd9f614064f9d329fd229f80b"
related: ["[[02_CURRICULUM/2.2.0/exercises/W03D13_AGENT_LOOP]]","[[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP]]","[[04_AUTOMATIONS_AND_APIS/Index]]"]
---

# תרגיל לולאת סוכן

[קובץ המקור הציבורי](https://github.com/oroofarm-lang/AI-Agent-Engineer/blob/main/content/labs/W03D13_AGENT_LOOP.py)

סוג הקובץ: `exercise-code`. נתיב במאגר הציבורי: `content/labs/W03D13_AGENT_LOOP.py`.

זהו קובץ קוד ציבורי. הכללתו בכספת אינה מעידה שבוצעה כאן הרצה.

## תוכן הקובץ הציבורי

```
"""Provider-independent control loop. The scripted model is explicitly a test double."""
import json


def lookup_customer(customer_id: str) -> dict:
    if not isinstance(customer_id, str):
        raise ValueError('customer_id must be text')
    customers = {'C1': {'name': 'Demo customer', 'status': 'active'}}
    if customer_id not in customers:
        raise ValueError('customer not found')
    return customers[customer_id]


def run_agent(model, goal: str, max_steps: int = 4) -> dict:
    if not isinstance(max_steps, int) or isinstance(max_steps, bool) or not 1 <= max_steps <= 20:
        raise ValueError('max_steps must be 1..20')
    history = [{'role': 'user', 'content': goal}]
    tools = {'lookup_customer': lookup_customer}
    for step in range(max_steps):
        decision = model(list(history))
        if not isinstance(decision, dict):
            raise ValueError('model response must be an object')
        if decision.get('kind') == 'final':
            if not isinstance(decision.get('text'), str):
                raise ValueError('final text must be a string')
            return {'status': 'completed', 'result': decision['text'], 'trace': history}
        if decision.get('kind') != 'tool' or decision.get('name') not in tools:
            raise ValueError('unknown tool decision')
        arguments = decision.get('arguments')
        if not isinstance(arguments, dict) or set(arguments) != {'customer_id'}:
            raise ValueError('invalid tool arguments')
        try:
            result = tools[decision['name']](arguments['customer_id'])
            observation = {'ok': True, 'data': result}
        except ValueError as error:
            observation = {'ok': False, 'error': str(error)}
        history.append({'role': 'tool', 'step': step,
                        'name': decision['name'], 'content': json.dumps(observation)})
    return {'status': 'step_limit', 'result': None, 'trace': history}


def scripted_model(history):
    if len(history) == 1:
        return {'kind': 'tool', 'name': 'lookup_customer',
                'arguments': {'customer_id': 'C1'}}
    return {'kind': 'final', 'text': 'Demo: lookup finished; inspect the tool observation.'}


if __name__ == '__main__':
    print(json.dumps(run_agent(scripted_model, 'Look up customer C1'), indent=2))

```

## קשרים במפת הידע

- [[02_CURRICULUM/2.2.0/exercises/W03D13_AGENT_LOOP|התרגול: לולאת סוכן ידנית]] — קוד לתרגול
- [[02_CURRICULUM/2.2.0/lessons/W03D13_AGENT_LOOP|לולאת סוכן ידנית]] — קובץ עזר לשיעור
- [[04_AUTOMATIONS_AND_APIS/Index|חיבורים, ממשקים וקובצי עזר]] — קובץ עזר
