import { ElementProps } from '../types';
import {
  Disclosure,
  Button,
  DisclosurePanel,
  Heading,
} from 'react-aria-components';

function Element({ node }: ElementProps) {
  return (
    <Disclosure>
      <Heading>
        {node.role && node.name && (
          <Button slot='trigger'>
            <svg viewBox='0 0 24 24'>
              <path d='m8.25 4.5 7.5 7.5-7.5 7.5' />
            </svg>
            <p
              id={!node.compliance ? 'compliance-issue' : ''}
              className='results-title'
            >
              Role:
            </p>
            <p className='node-role'>{node.role}</p>
          </Button>
        )}
      </Heading>
      <DisclosurePanel>
        {node.level && <p className='results-title'>Level: {node.level}</p>}
        <p className='results-title'>Name: {node.name}</p>
        {!node.compliance && (
          <p id='compliance-issue' className='results-title'>
            Compliance Issue: {node.complianceDetails}
          </p>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Element;
