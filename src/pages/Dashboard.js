import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaGlobe, FaImage, FaUser } from 'react-icons/fa';
import '../styles/CircularProgressBar.css';
import * as utils from '../utils/utils';


const Dashboard = ({ darkMode, setDarkMode }) => {
    // Data . . .
    const withdrawnCardData = {
        amountWithdrawn: "22,748",
        percentageIncrease: 10,
        percentageCommision: 43,
        potentialCommision: "26,347",
        earnedCommision: "12,443",
        refund: "2,443"
    };
    const studentCardData = {
        dailyAverage: 49,
        dailyStudents: 1175,
        dailyApplications: 1254,
        weeklyAverage: 123,
        weeklyStudents: 2154,
        weeklyApplications: 3254,
        monthlyAverage: 345,
        monthlyStudents: 11175,
        monthlyApplications: 21254,
        offerSent: 1042,
        accepted: 460,
        registered: 232
    };
    const applicationsData = {
        amount: "1,000",
        universal: "2,050",
        global: "3,030"
    };
    const agenciesData = {
        total: 345,
        active: 210,
        inactive: 135
    };
    const row2Data = {
        agencies: {
            card1: {
                title: "Agencies",
                total: 345,
                active: 210,
                inactive: 135
            },
            students: {
                offerSent: {
                    total: 1443,
                },
                accepted: {
                    total: 1234
                },
                registered: {
                    total: 2344
                },
                boxA: {
                    title: "Agency A",
                    value: 323,
                    percent: 20
                }
                ,
                boxB: {
                    title: "Agency B",
                    value: 230,
                    percent: 17
                }
                ,
                boxC: {
                    title: "Agency C",
                    value: 180,
                    percent: 15
                }
                ,
                others: {
                    value: 573,
                    percent: 35
                }
            },
            commision: {
                total: "21,355",
                boxA: {
                    title: "Agency A",
                    value: 323,
                    percent: 20
                }
                ,
                boxB: {
                    title: "Agency B",
                    value: 230,
                    percent: 17
                }
                ,
                boxC: {
                    title: "Agency C",
                    value: 180,
                    percent: 15
                }
            }
        },
        counselor: {
            card1: {
                title: "Counselor",
                total: 345,
                active: 210,
                inactive: 135
            },
            students: {
                offerSent: {
                    total: 1443,
                },
                accepted: {
                    total: 1234
                },
                registered: {
                    total: 2344
                },
                boxA: {
                    title: "Counselor A",
                    value: 323,
                    percent: 20
                }
                ,
                boxB: {
                    title: "Counselor B",
                    value: 230,
                    percent: 17
                }
                ,
                boxC: {
                    title: "Counselor C",
                    value: 180,
                    percent: 15
                },
                others: {
                    value: 573,
                    percent: 35
                }
            },
            commision: {
                total: "21,355",
                boxA: {
                    title: "Counselor A",
                    value: 323,
                    percent: 20
                }
                ,
                boxB: {
                    title: "Counselor B",
                    value: 230,
                    percent: 17
                }
                ,
                boxC: {
                    title: "Counselor C",
                    value: 180,
                    percent: 15
                },
            }
        },
        mentor: {
            card1: {
                title: "Mentor",
                total: 345,
                active: 210,
                inactive: 135
            },
            students: {
                offerSent: {
                    total: 1443,
                },
                accepted: {
                    total: 1234
                },
                registered: {
                    total: 2344
                },
                boxA: {
                    title: "Mentor A",
                    value: 323,
                    percent: 20
                }
                ,
                boxB: {
                    title: "Mentor B",
                    value: 230,
                    percent: 17
                }
                ,
                boxC: {
                    title: "Mentor C",
                    value: 180,
                    percent: 15
                },
                others: {
                    value: 573,
                    percent: 35
                }
            },
            commision: {
                total: "21,355",
                boxA: {
                    title: "Mentor A",
                    value: 323,
                    percent: 20
                }
                ,
                boxB: {
                    title: "Mentor B",
                    value: 230,
                    percent: 17
                }
                ,
                boxC: {
                    title: "Mentor C",
                    value: 180,
                    percent: 15
                },
            }
        },
    };
    const statisiticsData = {
        daily: {
            students: 8,
        },
        weekly: {
            students: 5,
        },
        monthly: {
            students: 2,
        }
    };

    // State variables . . .
    const [isFilterVisible, setFilterVisibility] = useState(false);
    const [isBalanceHidden, setBalanceHidden] = useState(false);
    const [studentCardSelectedInterval, setStudentCardSelectedInterval] = useState('Daily');
    const [selectedRow2Tab, setSelectedRow2Tab] = useState('agencies');
    const [activeStudentsTab, setActiveStudentsTab] = useState('offerSent');
    const [selectedRow3Tab, setSelectedRow3Tab] = useState('Daily');

    // References . . .
    const row1ScrollContainerRef = useRef(null);

    // State variable handlers . . .
    const toggleFilterVisibility = () => {
        setFilterVisibility(!isFilterVisible);
    };
    const toggleBalanceVisibility = () => {
        setBalanceHidden(!isBalanceHidden);
    };
    const handleStudentCardIntervalChange = (interval) => {
        setStudentCardSelectedInterval(interval);
    };
    const handleRow2TabClick = (tab) => {
        setSelectedRow2Tab(tab);
    };
    const handleStudentsTabClick = (tab) => {
        setActiveStudentsTab(tab);
    };
    const handleRow3TabClick = (tabName) => {
        setSelectedRow3Tab(tabName);
    };

    // Getters . . .
    const getStudentCardDataForSelectedInterval = () => {
        switch (studentCardSelectedInterval) {
            case 'Daily':
                return {
                    average: studentCardData.dailyAverage,
                    students: studentCardData.dailyStudents,
                    applications: studentCardData.dailyApplications,
                    offerSent: studentCardData.offerSent,
                    accepted: studentCardData.accepted,
                    registered: studentCardData.registered,
                };
            case 'Weekly':
                return {
                    average: studentCardData.weeklyAverage,
                    students: studentCardData.weeklyStudents,
                    applications: studentCardData.weeklyApplications,
                    offerSent: studentCardData.offerSent,
                    accepted: studentCardData.accepted,
                    registered: studentCardData.registered,
                };
            case 'Monthly':
                return {
                    average: studentCardData.monthlyAverage,
                    students: studentCardData.monthlyStudents,
                    applications: studentCardData.monthlyApplications,
                    offerSent: studentCardData.offerSent,
                    accepted: studentCardData.accepted,
                    registered: studentCardData.registered,
                };
            default:
                return {};
        }
    };
    const getRow2DataForSelectedTab = () => {
        switch (selectedRow2Tab) {
            case 'agencies':
                return row2Data.agencies;
            case 'counselor':
                return row2Data.counselor;
            case 'mentor':
                return row2Data.mentor;
            default:
                return {};
        }
    };
    const currentStudentCardData = getStudentCardDataForSelectedInterval();
    const currentRow2Data = getRow2DataForSelectedTab();

    // Other functions . . .
    const scrollToNextItem = (direction) => {
        const scrollContainer = row1ScrollContainerRef.current;

        if (scrollContainer) {
            // Calculate the index of the currently visible child
            let visibleChildIndex = Array.from(scrollContainer.children).findIndex(
                (child) => child.getBoundingClientRect().left >= 0 && child.getBoundingClientRect().right <= window.innerWidth
            );

            // Calculate the index of the next or previous child
            const targetIndex = direction === 'left' ? (visibleChildIndex - 1 <= 0) ? 0 : visibleChildIndex - 1 : visibleChildIndex + 1;

            // Scroll to the next or previous child based on the index
            const targetChild = scrollContainer.children[targetIndex];
            if (targetChild) {
                targetChild.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start',
                });
            }
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-[#f6f6f6]'} w-full pl-[15px]`}>
            {/* Header */}
            <Header />

        </div>
    )
};

// Components . . .
const Header = () => {
    return (<div>
        <div className={`px-[25px] py-[20px] bg-white rounded-bl-[5px] mb-[20px]`}>
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='mb-[10px] md:mb-0'>
                    <p className='text-[#23255c] text-[16px] leading-[25px] font-normal'>Welcome</p>
                    <p className='text-[#24245c] text-[20px] leading-[25px] font-normal'>Isaac Longtau</p>
                    <div className='flex items-center justify-center gap-[8px] border-t-[2px] w-fit mt-[8px] pt-[8px]'>
                        <p className='text-[#5cbf54] font-bold text-[16px]'>Admin</p>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='pr-[20px] border-r-[1px]'>
                    </div>
                    <div className='flex items-center gap-[20px] px-[20px]'>
                        <FaGlobe color='#3c3e6e' />
                        <FaUser color='#3c3e6e' />
                    </div>
                </div>
            </div>
        </div>
    </div>)
};
const CircularProgressBar = ({ targetValue }) => {
    const [animationStarted, setAnimationStarted] = useState(false);
    const progressValue = useRef(0);
    const progressBar = useRef(null);
    const valueContainer = useRef(null);
    const speed = 10;

    useEffect(() => {
        if (!animationStarted) {
            const progress = setInterval(() => {
                progressValue.current += 1;

                valueContainer.current.textContent = `${progressValue.current}%`;
                progressBar.current.style.background = `conic-gradient(
            #56bce4 ${progressValue.current * 3.6}deg,
            #cadcff ${progressValue.current * 3.6}deg
          )`;

                if (progressValue.current >= targetValue) {
                    clearInterval(progress);
                    setAnimationStarted(true);
                }
            }, speed);

            return () => {
                clearInterval(progress);
            };
        }
    }, [targetValue, animationStarted]);

    return (
        <div className="circular-progress relative" ref={progressBar}>
            <div className='absolute inset-1/4 bg-[#56bce4] rounded-full w-1/2 h-1/2 flex items-center justify-center'>
                <div className="font-poppins text-[20px] font-bold text-white" ref={valueContainer}>
                    0%
                </div>
            </div>
        </div>
    );
};
const Row3Card = ({ title, lightColor, mainColor, darkMode, colorCode, selectedRow3Tab }) => {

    const data = [3, 1, 2, 1, 1, 3, 5];
    const date = [23, 24, 25, 26, 27, 28, 29];
    const barHeightMultiplier = 30;

    const bars = data.map((value, index) => (
        <div
            key={index}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: `${value * barHeightMultiplier}px`,
                backgroundColor: colorCode,
                width: '20px',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                textAlign: 'center',
                color: 'white',
            }}
        >
            <p>{value}</p>
        </div>
    ));

    const dateRow = date.map((value, index) => (
        <div key={index}>
            <p>{value}</p>
            <p>{utils.getDayFromIndex(index)}</p>
        </div>
    ));

    return (
        <div>
            <div className={`rounded-[20px] ${darkMode ? 'bg-dark-gray' : 'bg-white'} p-[25px] mr-[5px] min-w-screen`}>
                <div className='flex items-top justify-between'>
                    <div className='px-[8px]'>
                        <p className=''>{selectedRow3Tab} {title}</p>
                        <span className='flex gap-[6px] items-center pt-[10px]'><h1 className='font-bold text-[22px]'>16</h1><p>students</p></span>
                        <p className='text-[14px] text-black/[0.7]'>Total</p>
                    </div>
                    <div className={`bg-[${lightColor}] h-[50px] w-[50px] px-[8px] rounded-[6px] flex items-center justify-center`}>
                        <FaImage color={colorCode} />
                    </div>
                </div>
                <div>
                    {selectedRow3Tab === 'Daily' ? <div className='relative mt-[15px] min-w-[77%] mr-[25px]'>
                        <div className='h-[140px] bg-white rounded-[15px] shadow-lg m-[10px] p-[20px]'>
                            <div className='flex justify-between'>
                                <div className='rounded-full shadow-lg p-[6px]'><FaUser /></div>
                                <p>1/8</p>
                            </div>
                            <div className='mt-[20px]'>
                                <p className='text-[13px] text-black/[0.7] font-bold'>Necmettin Murat TENIL</p>
                                <p className='text-[12px] text-black/[0.7] font-bold'>Computer Engineering</p>
                            </div>
                        </div>
                        <div className={`absolute left-[0px] top-1/2 ${mainColor} rounded-[4px] flex items-center justify-center p-[3px]`}><FaChevronLeft color='white' size={16} /></div>
                        <div className={`absolute right-[0px] top-1/2 ${mainColor} rounded-[4px] flex items-center justify-center p-[3px]`}><FaChevronRight color='white' size={16} /></div>
                    </div> : <div> <div className='flex items-end justify-center gap-[15px]'>{bars}</div>
                        <div className='flex items-end justify-center gap-[15px]'>
                            {dateRow}
                        </div>
                    </div>}

                </div>
            </div>
        </div>
    )
};
const HorizontalBarChart = ({ students, applications }) => {
    let maxValue = Math.max(students, applications);
    let scaleFactor = 200 / maxValue;

    const scaledStudents = Math.ceil(students * scaleFactor).toString();
    const scaledApplications = Math.ceil(applications * scaleFactor).toString();

    return (
        <div className='border-l-[1px] py-[25px] items-center'>
            <div
                className={`h-[25px] bg-[#5cbf54] w-[${scaledStudents}px] rounded-tr-[8px] rounded-br-[8px] my-[10px]`}
            ></div>
            <div
                className={`h-[25px] bg-[#dbf4de] w-[${scaledApplications}px] rounded-tr-[8px] rounded-br-[8px] my-[10px]`}
            ></div>
        </div>
    );
};
const StudentsTab = ({ label, isActive, onClick }) => {
    return (
        <div
            className={`border-[1px] flex items-center justify-center cursor-pointer ${isActive ? 'text-black' : 'text-black/[0.5]'
                }`}
            onClick={onClick}
        >
            <p className='text-[13px] font-bold px-[25px] py-[6px]'>{label}</p>
        </div>
    );
}

const Row3 = ({ selectedRow3Tab }) => {
    const DummyData = [
        {
            title: 'Application',
            lightColor: '#dbedf4',
            mainColor: 'bg-gstats1',
            darkMode: false,
            colorCode: '#7c7e9f',
        },
        {
            title: 'Offer Sent',
            lightColor: '#dbedf4',
            mainColor: 'bg-gstats2',
            darkMode: false,
            colorCode: '#6fc5eb',
        },
        {
            title: 'Acceptance',
            lightColor: '#dbf4de',
            mainColor: 'bg-gstats3',
            darkMode: false,
            colorCode: '#7bcb75',
        },
        {
            title: 'Application',
            lightColor: '#dbedf4',
            mainColor: 'bg-gstats1',
            darkMode: false,
            colorCode: '#7c7e9f',
        },
        {
            title: 'Offer Sent',
            lightColor: '#dbedf4',
            mainColor: 'bg-gstats2',
            darkMode: false,
            colorCode: '#6fc5eb',
        },
        {
            title: 'Acceptance',
            lightColor: '#dbf4de',
            mainColor: 'bg-gstats3',
            darkMode: false,
            colorCode: '#7bcb75',
        },
        {
            title: 'Offer Sent',
            lightColor: '#dbedf4',
            mainColor: 'bg-gstats2',
            darkMode: false,
            colorCode: '#6fc5eb',
        },
        {
            title: 'Acceptance',
            lightColor: '#dbf4de',
            mainColor: 'bg-gstats3',
            darkMode: false,
            colorCode: '#7bcb75',
        },
    ];

    const [activeDot, setActiveDot] = useState(0);
    const scrollContainerRef = useRef(null);

    const handleDotClick = (index) => {
        setActiveDot(index);
        const cardElement = scrollContainerRef.current.children[index];
        cardElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
        });
    };

    return (
        <div className='grid grid-cols-1'>
            <div ref={scrollContainerRef} className='flex overflow-x-auto scroll-container gap-[10px]'>
                {DummyData.map((data, index) => (
                    <div key={index} className='flex-none md:min-w-[32%]'>
                        <Row3Card
                            title={data.title}
                            lightColor={data.lightColor}
                            mainColor={data.mainColor}
                            darkMode={data.darkMode}
                            colorCode={data.colorCode}
                            selectedRow3Tab={selectedRow3Tab}
                        />
                    </div>
                ))}
            </div>
            {/* Dots */}
            <div className='flex justify-center py-[30px]'>
                <div className='flex gap-[10px]'>
                    {DummyData.map((_, index) => (
                        <div
                            key={index}
                            className={`h-[20px] w-[20px] rounded-full border-[3px] border-white ${index === activeDot ? 'bg-[#56bce4]' : 'bg-white'
                                }`}
                            onClick={() => handleDotClick(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard
