export * from 'gsap';
export * from 'gsap/DrawSVGPlugin';
export * from 'gsap/TextPlugin';
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

//  NOTE:   You must import the plugin, export the plugin, and then add it to the register
//          function beflow for everything to work hapily together.

gsap.registerPlugin(TextPlugin, SplitText);