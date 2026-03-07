export interface Topic {
  id: string;
  title: string;
  content: string;
  youtubeId?: string;
  imageUrl?: string;
  imageCaption?: string;
}

export interface Term {
  number: number;
  title: string;
  topics: Topic[];
}

export const TEXTBOOK_DATA: Term[] = [
  {
    number: 1,
    title: "Development of the Self in Society",
    topics: [
      {
        id: "t1-1",
        title: "Self-Image and Self-Motivation",
        content: "Self-image is the mental picture you have of yourself. It includes your physical appearance and your character traits. Factors that influence self-image include media (social media, advertisements), peers, family, and internal self-talk. Developing a positive self-image is crucial for mental health and success. Self-motivation is the internal drive that leads us to initiate, continue, and finish a task. It is the force that keeps pushing you to go on – it's our internal drive to achieve, produce, develop, and keep moving forward.",
        youtubeId: "v7Xv29XvHnI",
        imageUrl: "https://images.unsplash.com/photo-1494178270175-e96de2971df9?auto=format&fit=crop&q=80&w=800",
        imageCaption: "A positive self-image starts from within."
      },
      {
        id: "t1-2",
        title: "Changes in Boys and Girls: Puberty",
        content: "Puberty is the period during which adolescents reach sexual maturity and become capable of reproduction. Physical changes include growth spurts, skin changes (acne), and hair growth. In girls, it includes breast development and the start of menstruation. In boys, it includes deepening of the voice and muscle development. Emotional changes often include mood swings, increased sensitivity, and a need for independence. These changes are natural and happen to everyone at different rates.",
        youtubeId: "TRyScH5M0U0",
        imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Understanding the changes in your body is part of growing up."
      },
      {
        id: "t1-3",
        title: "Peer Pressure and Assertiveness",
        content: "Peer pressure is the influence exerted by a peer group in encouraging a person to change their attitudes, values, or behavior in order to conform to the group. It can be positive (encouraging good grades) or negative (encouraging risky behavior). Assertiveness is the quality of being self-assured and confident without being aggressive. It involves standing up for your own rights while respecting the rights of others. Learning to say 'no' firmly and clearly is a vital life skill for handling negative peer pressure.",
        youtubeId: "iS-0p96FAnw",
        imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Learning to say 'no' is a vital life skill."
      },
      {
        id: "t1-4",
        title: "Reading and Studying Skills",
        content: "Effective study skills are essential for academic success. These include time management, creating a study schedule, active reading (summarizing and questioning), and using memory aids like mnemonics. Reading with understanding requires focus and the ability to identify main ideas and supporting details.",
        youtubeId: "CPxSzxylRCI",
        imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Good study habits lead to better results."
      }
    ]
  },
  {
    number: 2,
    title: "Health, Social and Environmental Responsibility",
    topics: [
      {
        id: "t2-1",
        title: "Human Rights and Responsibilities",
        content: "The South African Constitution protects the human rights of all people through the Bill of Rights. With every right comes a responsibility. For example, the right to education comes with the responsibility to attend school and work hard. The right to a clean environment comes with the responsibility to not litter. Understanding these rights helps us live in a fair and just society. We must respect the rights of others just as we want ours to be respected.",
        youtubeId: "pRGhrYmUjUo",
        imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
        imageCaption: "The Bill of Rights is the cornerstone of South African democracy."
      },
      {
        id: "t2-2",
        title: "Dealing with Abuse",
        content: "Abuse can be physical, emotional, or sexual. It is any behavior that is used to gain fear and control over another person. It is important to identify signs of abuse, such as unexplained bruises, constant fear, or withdrawal from social activities. No one deserves to be abused. If you or someone you know is being abused, it is vital to speak out. You can seek help from a trusted adult, a teacher, or organizations like Childline (116). Reporting abuse is a brave step toward safety.",
        youtubeId: "lVp6V_h-Acs",
        imageUrl: "https://images.unsplash.com/photo-1484062860273-04981880492c?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Nobody has the right to hurt you."
      },
      {
        id: "t2-3",
        title: "Personal Diet and Nutrition",
        content: "A balanced diet is essential for physical development and mental clarity, especially during puberty. This involves eating a variety of foods from all food groups: carbohydrates for energy, proteins for growth and repair, fats for brain health, and vitamins and minerals for overall well-being. Avoiding excessive sugar and processed foods helps maintain stable energy levels and healthy skin.",
        youtubeId: "Gmh_xMMJ2Pw",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Healthy eating fuels your body and mind."
      }
    ]
  },
  {
    number: 3,
    title: "Constitutional Rights and Responsibilities",
    topics: [
      {
        id: "t3-1",
        title: "Substance Abuse",
        content: "Substance abuse refers to the harmful or hazardous use of psychoactive substances, including alcohol, tobacco, and illicit drugs. Substance abuse can lead to addiction, health problems, and social issues. It often starts as a way to cope with stress or peer pressure. Understanding the long-term consequences on the brain and body is key to making healthy choices. Saying no to drugs is a commitment to your future self and your community.",
        youtubeId: "0S1jK_m0S7I",
        imageUrl: "https://images.unsplash.com/photo-1520202296691-2189ac24249a?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Choose health over addiction."
      },
      {
        id: "t3-2",
        title: "Environmental Health",
        content: "Environmental health focuses on the relationship between people and their environment. Issues like water pollution, air pollution, and poor waste management directly affect our physical health. For example, contaminated water can lead to diseases like cholera. We all have a responsibility to protect our environment by reducing waste, recycling, and conserving water. A healthy planet supports healthy people.",
        youtubeId: "G0S2T-hX7E0",
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Protecting our environment protects our future."
      },
      {
        id: "t3-3",
        title: "Cultural Diversity",
        content: "South Africa is known as the 'Rainbow Nation' because of its rich cultural diversity. We have 11 official languages and many different traditions, religions, and customs. Recognizing and respecting these differences enriches our society. Learning about other cultures helps reduce prejudice and builds a more inclusive and harmonious community.",
        youtubeId: "L_A6Z7yP_7M",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Diversity is our strength."
      }
    ]
  },
  {
    number: 4,
    title: "World of Work and Personal Health",
    topics: [
      {
        id: "t4-1",
        title: "Career Categories",
        content: "Different careers belong to various categories such as investigative, artistic, social, enterprising, and realistic. Exploring these categories helps you understand your interests and future options.",
        youtubeId: "2n07m-9Y1-k",
        imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Explore the vast world of career possibilities."
      },
      {
        id: "t4-2",
        title: "Personal Safety and HIV/AIDS",
        content: "Understanding how to stay safe in social situations and knowing the facts about HIV/AIDS is essential. Education reduces stigma and encourages responsible behavior.",
        youtubeId: "0m_h_xI52W4",
        imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
        imageCaption: "Knowledge is the first step in staying safe and healthy."
      }
    ]
  }
];
