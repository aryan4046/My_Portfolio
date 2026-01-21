import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";


const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
       I am an IT Engineering student pursuing my B.Tech with a strong interest in full-stack development and AI-powered applications. 
       I enjoy building real-world projects that solve practical problems using modern technologies. 
       I am actively seeking internship and entry-level opportunities to grow as a software developer and contribute to impactful products.
      </motion.p>
      
     <motion.div
  variants={fadeIn("", "", 0.2, 1)}
  className="mt-8 max-w-3xl"
>
  <h3 className="text-white text-[24px] font-bold mb-4">
    Skills Summary
  </h3>

  <p className="text-secondary text-[17px] leading-[32px]">
    Proficient in <span className="text-white font-medium">HTML, CSS, JavaScript, and React</span> with a strong
    foundation in backend development using <span className="text-white font-medium">Python and Node.js</span>.
    Experienced in building <span className="text-white font-medium">AI-based applications</span>, REST APIs, and
    responsive user interfaces. Comfortable working with <span className="text-white font-medium">Git</span>, 
    <span className="text-white font-medium"> cloud platforms</span>, and modern development tools to create 
    scalable and efficient solutions.
  </p>
</motion.div>


    <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div> 
    </>
  );
};

export default SectionWrapper(About, "about");
