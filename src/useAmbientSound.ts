import { useState, useRef, useEffect } from 'react';
export default function useAmbientSound() {
  const [enabled,setEnabled]=useState(false);const [error,setError]=useState(false);const context=useRef<AudioContext|null>(null);
  function stop(){if(context.current)void context.current.close().catch(()=>{});context.current=null;setEnabled(false);}
  async function toggle(){if(enabled){stop();return;}try{const audio=new AudioContext();context.current=audio;await audio.resume();const gain=audio.createGain();gain.gain.setValueAtTime(0,audio.currentTime);gain.gain.linearRampToValueAtTime(.022,audio.currentTime+2);gain.connect(audio.destination);[130.81,196,261.63].forEach((frequency,i)=>{const o=audio.createOscillator();o.type='sine';o.frequency.value=frequency;o.detune.value=i*2;o.connect(gain);o.start();});setEnabled(true);setError(false);}catch{stop();setError(true);}}
  useEffect(()=>{const hide=()=>{if(document.hidden)stop();};document.addEventListener('visibilitychange',hide);return()=>{document.removeEventListener('visibilitychange',hide);if(context.current)void context.current.close().catch(()=>{});};},[]);
  return {enabled,error,toggle};
}
