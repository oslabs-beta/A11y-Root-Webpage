import { DisplayElementsProps } from '../types';

function DisplayElements({ title, children, aside }: DisplayElementsProps) {
  return (
    <section className='dashboard-display'>
      <div className='dashboard-header'>
        <h2>{title}</h2>
        <aside>{aside}</aside>
      </div>
      <ul>{children}</ul>
    </section>
  );
}

export default DisplayElements;
