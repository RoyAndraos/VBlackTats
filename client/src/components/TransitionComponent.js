import React, { useContext } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

import TransitionContext from "../contexts/TransitionContext";

const TransitionComponent = ({ children }) => {
  const location = useLocation();
  const { toggleCompleted } = useContext(TransitionContext);
  gsap.registerPlugin();

  return (
    <SwitchTransition>
      <Transition
        key={location.pathname}
        timeout={500}
        onEnter={(node) => {
          toggleCompleted(false);
          gsap.set(node, { autoAlpha: 0, scale: 0.7, xPercent: -100 });
          gsap
            .timeline({
              paused: true,
              onComplete: () => toggleCompleted(true),
            })
            .to(node, { autoAlpha: 1, scale: 1, xPercent: 0, duration: 1 })
            .play();
        }}
        onExit={(node) => {
          gsap
            .timeline({ paused: true })
            .to(node, { xPercent: 30, scale: 0.7, duration: 1 })
            .to(node, { xPercent: 0, scale: 1, autoAlpha: 0.2, duration: 1 })
            .play();
        }}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
