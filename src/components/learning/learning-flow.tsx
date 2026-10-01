'use client';
import { useState, useId } from 'react';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import type { LearningFlowData } from '@/lib/curriculum/learning-flow';
/** A learner-paced illustration. These examples never execute code or contact an AI provider. */
export function LearningFlow({ data }: { data: LearningFlowData }) {
  const [current, setCurrent] = useState(0),
    id = useId(),
    step = data.steps[current];
  return (
    <figure className="learning-flow" aria-labelledby={`${id}-title`}>
      <figcaption id={`${id}-title`}>{data.title}</figcaption>
      <p>בחר שלב כדי לראות מה קורה בו, או התקדם בין השלבים לפי הסדר.</p>
      <ol className="flow-nodes">
        {data.steps.map((item, index) => (
          <li key={item.label}>
            <button
              className={index === current ? 'selected' : ''}
              aria-current={index === current ? 'step' : undefined}
              aria-controls={`${id}-detail`}
              onClick={() => setCurrent(index)}
            >
              <span className="flow-node-number">{index + 1}</span>
              <strong>{item.label}</strong>
            </button>
            {index < data.steps.length - 1 && (
              <ArrowDown className="flow-arrow" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      <div
        className="flow-detail"
        key={current}
        id={`${id}-detail`}
        role="status"
        aria-live="polite"
      >
        <h3>{step.label}</h3>
        <p>{step.detail}</p>
        <p className="flow-example">
          <strong>בדוגמה שלנו: </strong>
          {step.example}
        </p>
      </div>
      <div className="flow-controls">
        <button
          className="button secondary"
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
        >
          השלב הקודם בתרשים
        </button>
        <span>
          {current + 1} מתוך {data.steps.length}
        </span>
        <button
          className="button secondary"
          disabled={current === data.steps.length - 1}
          onClick={() => setCurrent(current + 1)}
        >
          השלב הבא בתרשים <ArrowLeft size={16} />
        </button>
      </div>
      <p className="flow-conclusion">
        <strong>מה למדנו מהתרשים?</strong> {data.conclusion}
      </p>
    </figure>
  );
}
