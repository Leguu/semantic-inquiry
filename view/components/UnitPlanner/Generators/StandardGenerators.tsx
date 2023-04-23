import { useRequests } from '@/utils/http';
import { Button } from '@blueprintjs/core';

export const generateConceptualUnderstandingsPrompt = (syllabusContent: string[], keyConcepts: string[], subjectAims: string[]) => {
  let prompt = `You are an IB Business management teacher. 
  Your task is to suggest a list of conceptual understandings that students will take away after studying the unit on "${syllabusContent.join(', ')}".`;

  if (keyConcepts.length > 0) {
    prompt += ` You must generate conceptual understanding based on the following key concepts "${keyConcepts.join(', ')}"`;
  }

  if (subjectAims.length > 0) {
    prompt += ` and subject aims "${subjectAims.join(', ')}"`;
  }

  prompt += '.';

  return prompt;
};

const generateToKConnectionsPrompt = (syllabusContent: string[]) => {
  let prompt = `You are IB Business management teacher who plans connections between the subject and the Theory of knowledge for the ${syllabusContent.join(', ')}.`;

  prompt += `Suggest a few ToK discussion prompts that relate to the topics above.
  
  Here are some guidelines for making connection:
  1. make connections between a critical approach to the construction of knowledge, the academic disciplines and the wider world
  2. develop an awareness of how individuals and communities construct knowledge and how this is critically examined
  3. develop an interest in the diversity and richness of cultural perspectives and an awareness of personal and ideological assumptions
  4. critically reflect on their own beliefs and assumptions, leading to more thoughtful, responsible and purposeful lives
  5. understand that knowledge brings responsibility which leads to commitment and action.`;

  return prompt;
};

const generateCASConnectionsPrompt = (syllabusContent: string[], subjectAims: string[], contextOfInterest: string[]) => {
  let prompt = `You are IB Business management teacher that plans opportunities for CAS for students studying ${syllabusContent.join(', ')}`;

  if (subjectAims.length > 0) {
    prompt += `, ${subjectAims.join(', ')}`;
  }

  if (contextOfInterest.length > 0) {
    prompt += `and are interested ${contextOfInterest.join(', ')}`;
  }

  prompt += '.';

  prompt += ` Suggest a few CAS activities or projects that IB DP students could pursue.`;

  return prompt;
};

interface Props {
  syllabusContent: string[];
  keyConcepts: string[];
  subjectAims: string[];
  contextOfInterest: string[];
  onPromptGenerated: (prompt: string) => void;
}

const StandardGenerators = ({ syllabusContent, keyConcepts, subjectAims, contextOfInterest, onPromptGenerated }: Props) => {
  return <>
    <Button
      className='w-full justify-start'
      onClick={() => onPromptGenerated(generateConceptualUnderstandingsPrompt(syllabusContent, keyConcepts, subjectAims))}
      intent='primary'
      icon='predictive-analysis'
    >
      Conceptual Understandings
    </Button>

    <Button
      className='w-full justify-start'
      onClick={() => onPromptGenerated(generateToKConnectionsPrompt(syllabusContent))}
      intent='primary'
      icon='draw'
    >
      ToK Connections
    </Button>

    <Button
      className='w-full justify-start'
      onClick={() => onPromptGenerated(generateCASConnectionsPrompt(syllabusContent, subjectAims, contextOfInterest))}
      intent='primary'
      icon='build'
    >
      CAS Connections
    </Button>
  </>;
};

export default StandardGenerators;