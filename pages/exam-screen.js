import { getLearnerExamObj, LearnerExamAtom } from '@/state/atoms/exams.atoms';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import LearnerExamComponent from '../components/LearnerExamComp';
import ExamInstruction from '../components/LearnerExamComp/ExamInstructions';

const ExamScreen = () => {
  let [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  useEffect(() => {
    setLearnerExamData(getLearnerExamObj());
  }, []);

  const router = useRouter();
  const examData = [
    {
      id: 1,
      question: {
        description:
          'Wimbledon is the oldest tennis tournament in the world, and is widely considered the most prestigious. It has been always held at the All England Club in Wimbledon, London. In which year was the first championship held?',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          description: '1864',
          image: '/images/bg-new.png'
        },
        {
          id: 'b',
          description: '1877'
        },
        {
          id: 'c',
          description: '1894',
          image: '/images/bg-new.png'
        },
        {
          id: 'd',
          description: '1902',
          image: '/images/bg-new.png'
        }
      ]
    },
    {
      id: 2,
      question: {
        description:
          "He is a former professional ice hockey player who played with the Montreal Canadiens in the National Hockey League (NHL) from 1955 to 1975. He won 11 Stanley Cups, more than any other player in NHL history. He was given the nick name 'Pocket Rocket'. Who was he?"
      },
      options: [
        {
          id: 'a',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image001.png'
        },
        {
          id: 'b',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image002.png'
        },
        {
          id: 'c',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image003.png'
        },
        {
          id: 'd',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image004.png'
        }
      ]
    },
    {
      id: 3,
      question: {
        description:
          "He became two-time inductee into the Basketball Hall of Fame ? being enshrined in 2002 for his individual career, and again in 2010 as a member of the 'Dream Team'. He was rated the greatest National Basketball Association (NBA) point guard of all time by ESPN in 2007. Who is this legendary basketball player who played for the Lakers?"
      },
      options: [
        {
          id: 'a',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image005.png'
        },
        {
          id: 'b',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image006.png'
        },
        {
          id: 'c',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image007.png'
        },
        {
          id: 'd',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image008.png'
        }
      ]
    },
    {
      id: 4,
      question: {
        description:
          'It is a traditional ball game played in Assam. In this game, the players take turns throwing the ball at the opponent to knock them out of the game, while seeking to catch the ball and evade other players. It is a test of speed, stamina, and acrobatic skills. Which game is this? ',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          description: 'Dhopkhel'
        },
        {
          id: 'b',
          description: 'Kith kith'
        },
        {
          id: 'c',
          description: 'Pallankuzhi'
        },
        {
          id: 'd',
          description: 'Satoliya'
        }
      ]
    },
    {
      id: 5,
      question: {
        description:
          '"Float like a butterfly, sting like a bee. The hands can\'t hit what the eyes can\'t see." To which of the following sportspersons does this memorable quote attributed to?'
      },
      options: [
        {
          id: 'a',
          description: 'Floyd Mayweather Jr'
        },
        {
          id: 'b',
          description: 'Mike Tyson'
        },
        {
          id: 'c',
          description: 'Muhammad Ali'
        },
        {
          id: 'd',
          description: 'Sugar Ray Robinson'
        }
      ]
    },
    {
      id: 6,
      question: {
        description:
          "This vault is considered the hardest vault performed in women's artistic gymnastics. The first person to complete it successfully in 1999 was a Russian after whom it is named. This vault is also called the 'vault of death' due to its difficulty and likelihood of injury. What is the name of the vault?",
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          description: 'Yurchenko'
        },
        {
          id: 'b',
          description: 'Demidova'
        },
        {
          id: 'c',
          description: 'Produnova'
        },
        {
          id: 'd',
          description: 'Tsukahara'
        }
      ]
    },
    {
      id: 7,
      question: {
        description:
          'Which of the following is not a type of sailboats used in competitive sailing?',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          description: '49er'
        },
        {
          id: 'b',
          description: 'Tornado'
        },
        {
          id: 'c',
          description: 'Luff'
        },
        {
          id: 'd',
          description: 'Europe'
        }
      ]
    },
    {
      id: 8,
      question: {
        description:
          'Which of the following is not a standard international racing distance in the sport canoeing and kayaking?'
      },
      options: [
        {
          id: 'a',
          description: '200m'
        },
        {
          id: 'b',
          description: '500m'
        },
        {
          id: 'c',
          description: '1000m'
        },
        {
          id: 'd',
          description: '2500m'
        }
      ]
    },
    {
      id: 9,
      question: {
        description:
          'In a tennis match, the choice of the server in the first game is decided by a coin toss. The player who wins may choose to have the opponent serve first. How many chances to serve does the player who serves get?',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          description: '1'
        },
        {
          id: 'b',
          description: '2'
        },
        {
          id: 'c',
          description: '3'
        },
        {
          id: 'd',
          description: '4'
        }
      ]
    },
    {
      id: 10,
      question: {
        description:
          'The Queens-berry rules endorsed by the Marquess of Queens-berry in the 19th century is a code of generally accepted rules in the sport of boxing. Which of the following is not one of the accepted Queensberry rules?',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          description: 'No wrestling or hugging is allowed.'
        },
        {
          id: 'b',
          description: 'The boxers must wear protective headgear.'
        },
        {
          id: 'c',
          description:
            'Fights are divided into 3 minutes rounds, separated by 1 minute rest periods.\n'
        },
        {
          id: 'd',
          description: 'A 10 second count is mandatory if a boxer is knocked down.'
        }
      ]
    },
    {
      id: 11,
      question: {
        description:
          'This championship is a domestic first- class cricket championship played in India between teams representing regional cricket associations. The competition is named after first Indian cricketer who played international cricket for England. Who was the player after whom it is named?'
      },
      options: [
        {
          id: 'a',
          description: 'B B Nimbalkar'
        },
        {
          id: 'b',
          description: 'Vijay Merchant'
        },
        {
          id: 'c',
          description: 'K S Ranjitsinhji'
        },
        {
          id: 'd',
          description: 'Mansoor Ali Khan Pataudi'
        }
      ]
    },
    {
      id: 12,
      question: {
        description: 'Who won the 2022 Thomas Cup?',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          description: 'India'
        },
        {
          id: 'b',
          description: 'Indonesia'
        },
        {
          id: 'c',
          description: 'Japan'
        },
        {
          id: 'd',
          description: 'China'
        }
      ]
    },
    {
      id: 13,
      question: {
        description:
          "The World Table Tennis Championships have been held since 1926, biennia since 1957. Seven different events presented by different trophies are currently held with individual events in odd numbered years and team events in even-numbered years. Which of the following trophies is awarded to the women's team champion?"
      },
      options: [
        {
          id: 'a',
          description: 'Swaythling Cup'
        },
        {
          id: 'b',
          description: 'Heydusek Cup'
        },
        {
          id: 'c',
          description: 'Iran Cup'
        },
        {
          id: 'd',
          description: 'Corbillon Cup '
        }
      ]
    },
    {
      id: 14,
      question: {
        description:
          'This trophy is a biennial world amateur team golf championship for men organized by the International Golf Federation. It is named after the then President of United States when the tournament was first played. Which US President is it named after?'
      },
      options: [
        {
          id: 'a',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image011.png'
        },
        {
          id: 'b',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image012.png'
        },
        {
          id: 'c',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image013.png'
        },
        {
          id: 'd',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image014.png'
        }
      ]
    },
    {
      id: 15,
      question: {
        description:
          "Season 4 of the Pro-kabaddi League in 2016 saw  the launch of first professional woman kabaddi league, Women's Kabaddi Challenge (WKC). Three teams battled it out to be the first ever WKC champions. Which of the following was not one of the participants of the WKC?",
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          description: 'Pink Panthers'
        },
        {
          id: 'b',
          description: 'Fire Birds'
        },
        {
          id: 'c',
          description: 'Ice Divas'
        },
        {
          id: 'd',
          description: 'Storm Queens'
        }
      ]
    }
    // {
    //     id: ,
    //     question: {
    //         description: '',
    //         image: '/images/bg-new.png'
    //     },
    //     options: [
    //         {
    //             id: 'a',
    //             description: '',
    //         },
    //         {
    //             id: 'b',
    //             description: '',
    //         },
    //         {
    //             id: 'c',
    //             description: '',
    //         },
    //         {
    //             id: 'd',
    //             description: '',
    //         },
    //     ]
    // },
  ];

  examData.forEach((each) => {
    each.isVisited = false;
    each.isMarked = false;
    each.selectedOption = null;
  });

  examData[0].isVisited = true;

  const [data, setData] = useState(examData);
  const [current, setCurrent] = useState(data[0]);
  const [isFullScreen, setIsFullScreen] = useState(0);
  const [isLearner, setIsLearner] = useState(false);
  const refFullscreen = useRef(null);

  /* View in fullscreen */
  function openFullscreen(elem) {
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem?.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem?.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
  // fix fullscreen issue
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      // videoContainer.current?.requestFullscreen();
      openFullscreen(refFullscreen.current);
      setIsFullScreen(1);
    } else {
      // document.exitFullscreen();
      setIsFullScreen(0);
      closeFullscreen();
    }

    // setPlayPauseActivated(!document.fullscreenElement ? 'enterFullScreen' : 'exitFullScreen');
  }

  return (
    <div ref={refFullscreen}>
      {isLearner ? (
        <LearnerExamComponent
          data={data}
          setData={setData}
          current={current}
          setCurrent={setCurrent}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      ) : (
        // <ExamLandingPage setIsLearner={setIsLearner} />
        <ExamInstruction
          setIsLearner={setIsLearner}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      )}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          display: 'flex',
          gap: '10px',
          marginLeft: '40px'
        }}>
        <div onClick={toggleFullScreen}>
          {isFullScreen ? (
            <Image src="/images/svg/fullscreen_exit.svg" height={30} width={30} />
          ) : (
            <Image src="/images/svg/fullscreen.svg" height={30} width={30} />
          )}
        </div>
        <div onClick={() => router.push('/exam')}>
          <Image src="/images/svg/clear.svg" height={30} width={30} />
        </div>
      </div>
    </div>
  );
};

export default ExamScreen;
