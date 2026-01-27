import React from 'react';
import './About.css';
import MaskedDiv from '../ui/masked-div';

const About = () => {
  return (
    <div className="about-container" id="about">
      <h2 className="about-title">About Me</h2>
      <div className="about-content">
        <MaskedDiv maskType="type-1" size={0.43} className="my-4">
            <video autoPlay loop muted>
              <source
                src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
                type="video/mp4"
              />
            </video>
        </MaskedDiv>
        

        <section className=" max-w-4xl px-6">
          {/* Foreground Content */}
          <div className="relative z-10 mt-0 space-y-4 text-left">
            <p className="text-2xl leading-relaxed text-gray-300/70">
              Meet{" "}
              <span className="font-medium text-white">
                Nilesh Ambekar
              </span>{" "}
              — a code-hungry <br /> {" "}
              <span className="font-bold text-white">
                problem-solver
              </span>{" "}
              who treats bugs <br /> 
              like uninvited guests.
            </p>

            <p className="text-2xl leading-relaxed text-gray-300">
              By day he wrangles{" "}
              <span className="font-medium text-white">
                Node.js, React and <br /> backend logic; {" "}
              </span>
               by night he hums <br /> Bollywood tunes between commits.
            </p>

            <p className="text-2xl leading-relaxed text-gray-300/70">
              Always juggling{" "}
              <span className="font-medium text-white">
                100+ tabs and side projects, <br />
              </span>
               he builds things that actually <br /> ship{" "}
              <span className="font-bold text-white">
                (and then refactors them)
              </span>
              .
            </p>

            <p className="text-2xl leading-relaxed text-gray-300">
              Friendly but relentless — he’ll refactor <br /> your{" "}
              <span className="font-bold text-white">
                messy API
              </span>{" "}
              and suggest a better playlist <br /> while he’s at it.
            </p>

            <p className="pt-4 text-m italic text-gray-400">
              P.S.{" "}
              <span className="font-medium text-white">
                "Play a classic Bollywood track"
              </span>{" "}
              and watch him debug with a beat.
            </p>
          </div>
    </section>
      </div>
    </div>
  );
};

export default About; 