export * from 'gsap';
export * from 'gsap/SplitText';
export * from 'gsap/TextPlugin';
export * from 'gsap/DrawSVGPlugin';
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

//  NOTE:   You must import the plugin, export the plugin, and then add it to the register
//          function beflow for everything to work hapily together.

gsap.registerPlugin(TextPlugin, SplitText, DrawSVGPlugin);