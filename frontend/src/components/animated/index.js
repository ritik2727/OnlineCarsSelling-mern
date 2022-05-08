import React , {Suspense} from 'react';
import lazy from 'react-lazy-named';



const MotionDiv =lazy(()=>
import('framer-motion'),'motion.div');

const AnimatePres =lazy(()=>
import('framer-motion'),'AnimatePresence');


export const AnimatedDiv = props => (
    <Suspense fallback={<div className={props.className}>{props.children}</div>} >
        <MotionDiv {...props} />
    </Suspense>
    )

export const Presence = props => (
    <Suspense fallback={<div className={props.className}>{props.children}</div>} >
        <AnimatePres {...props} />
    </Suspense>
    )