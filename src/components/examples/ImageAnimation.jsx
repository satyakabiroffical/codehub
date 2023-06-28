
import { useEffect } from 'react';
import { useAnimate, useAnimateKeyframes} from 'react-simple-animate';

export const useAnimateExample = () => {
  const { style, play } = useAnimate({ start: { opacity: 0 }, end: { opacity: 1 } });
  useEffect(() => play(true), []);
  
  return <div style={style}>useAnimate</div>;
};

export const useAnimateKeyframesExample = () => {
  const { style, play } = useAnimateKeyframes({ 
    keyframes: ['opacity: 0', 'opacity: 1'], 
    iterationCount: 4 
  });
  useEffect(() => play(true), []);
  
  return <div style={style}>useAnimate</div>;
};

// export const useAnimateGroup = () => {
//   const { styles = [], play } = useAnimateGroup({
//     sequences: [
//       { start: { opacity: 1 }, end: { opacity: 0 } },
//       { start: { background: "red" }, end: { background: "blue" } }
//     ]
//   });
//   useEffect(() => play(true), []);

//   return {styles.map(style => <div style={style}>useAnimateGroup</div>)};
// };