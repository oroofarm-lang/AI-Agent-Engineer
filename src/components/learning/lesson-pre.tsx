import { Children,isValidElement,type ReactNode } from 'react';
import { CodeBlock } from '../code-block';
import { LearningFlow } from './learning-flow';
import { parseLearningFlow } from '@/lib/curriculum/learning-flow';
/** Only trusted, schema-validated curriculum diagrams receive an interactive renderer. */
export function LessonPre({children}:{children:ReactNode}){
  const nodes=Children.toArray(children),node=nodes[0];
  if(nodes.length===1&&isValidElement<{className?:string;children?:ReactNode}>(node)&&node.props.className==='language-learning-flow'&&typeof node.props.children==='string')
    return <LearningFlow data={parseLearningFlow(node.props.children)}/>;
  return <CodeBlock>{children}</CodeBlock>;
}
