import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import YouTube from 'react-youtube';

// --- Data Structures with Categories Integrated ---
const ASHRAF_QUESTIONS = {
  "What is your name?": { 
    id: 1, 
    category: "Demographics", 
    videoId: "WZO0kXs6mrY", 
    transcript: "My name is Ashraf Manji." 
  },
  "Who is in your family?": { 
    id: 2, 
    category: "Demographics", 
    videoId: "nEe_iEcOtN8", 
    transcript: "Oh, many people. I have so many people in my family. I've had six sisters and three brothers." 
  },
  "Do you have a spouse or life partner? Are you married or have you been married?": { 
    id: 3, 
    category: "Demographics", 
    videoId: "XO6OdAEbJiE", 
    transcript: "\nMy spouse's name is… Sophia Lee." 
  },
  "Where do you live?": { 
    id: 5, 
    category: "Demographics", 
    videoId: "X7wdvofzEEI", 
    transcript: "\nI live in Evanston, Illinois [in the Chicago area]." 
  },
  "What do (or did) you do for a living? What job or career did you spend the majority of your life working at?": { 
    id: 6, 
    category: "Career", 
    videoId: "_diCLiddNIo", 
    transcript: "\nI'm retired now, but when I worked, I worked for the Chicago Public Schools in their school planning department." 
  },
  "What do you enjoy doing?": { 
    id: 7, 
    category: "Basics", 
    videoId: "Qn9aqxzlhsQ", 
    transcript: "[I enjoy] sleeping, mostly.\nI enjoy reading, I enjoy music… that's about it." 
  },
  "Are you religious? If so, what is your religion?": { 
    id: 8, 
    category: "Demographics", 
    videoId: "MORWIm12Zzs", 
    transcript: "\nI am not religious, no." 
  },
  "What is your gender identity? What are your pronouns?": { 
    id: 9, 
    category: "Demographics", 
    videoId: "Sn18AXxssyQ", 
    transcript: "\nI am a \nstraight male." 
  },
  "What is your native language? What languages do you speak?": { 
    id: 10, 
    category: "Demographics", 
    videoId: "G7E71VfmlNY", 
    transcript: "\nMy native language is Gujarati, actually a dialect of Gujarati which is Kathiawari.\nBut I also speak English and... I understand Hindi, although I cannot speak it very well.\nAnd in school I've learned French and German." 
  },
  "What level of education have you completed?": { 
    id: 11, 
    category: "Education", 
    videoId: "yEQeMKjiImQ", 
    transcript: "\nI have completed my Bachelor's and Master's degrees as well as a PhD." 
  },
  "When did you first arrive to the U.S.?": { 
    id: 12, 
    category: "History", 
    videoId: "uNSLlVXFSZg", 
    transcript: "\nI came to the United States in August of 1963." 
  },
  "Where did you land first in the U.S.? Where did you first arrive in the U.S.?": { 
    id: 13, 
    category: "History", 
    videoId: "IIsyvAK9ipQ", 
    transcript: "\nWell, I arrived in New York, which was the main port of entry, but then I proceeded to go to Pennsylvania where… I had a scholarship to attend a college called Bucknell University." 
  },
  "When did you first arrive to the Midwest?": { 
    id: 14, 
    category: "History", 
    videoId: "rgij2nawjVE", 
    transcript: "\nI arrived in [the] Midwest... in 1967 after I graduated from Bucknell [University].\nI came up here in Illinois to... go to Northwestern University [for graduate school]." 
  },
  "What did you pursue in Northwestern University? What degree did you earn there?": { 
    id: 15, 
    category: "Education", 
    videoId: "aJJNGHaSg0A", 
    transcript: "\nAt Northwestern [University] I got the Masters and PhD and that was in Urban Geography and Urban Planning." 
  },
  "What is your citizenship status? When did you become a U.S. citizen?": { 
    id: 16, 
    category: "History", 
    videoId: "kCXMKaraPqE", 
    transcript: "\nI'm a citizen of [the] United States and have been since about... 1975." 
  },
  "How did you feel about initially coming to the U.S.?": { 
    id: 17, 
    category: "Arrival", 
    videoId: "lUopLGgfXhY", 
    transcript: "Oh, I had a very high opinion of [the] United States... To me it was the greatest country in the world, particularly with respect to education.\nI heard and read so much about the universities in [the] United States.\nAll the technological advances that were happening... anywhere were really happening in the United States.\nSo there was much to admire about [the U.S.]. In addition to that, of course, [I admired] the values for which the United States stood [for]: the freedom, freedom of speech, freedom of religion, things like that.\nSo I was very, very impressed with [the] United States." 
  },
  "Did you intend to stay or leave the U.S. after receiving your education here?": { 
    id: 18, 
    category: "History", 
    videoId: "0dk1aNAK6DI", 
    transcript: "Once I came here, I did not really intend to stay here.\nThe idea was that I would get [a] college education over here and then go back to Tanzania and work over there." 
  },
  "Can you share a bit about your life before you decided to immigrate to the United States?": { 
    id: 19, 
    category: "Early Life", 
    videoId: "rAm3rZJg8R8", 
    transcript: "I'll tell you a little bit about my life in Tanzania, before I came here [to the U.S.].\nThe makeup of Tanzania at the time was like this. There were the English expatriates who governed the country.\nAnd... actually, I'll have to back up and start again.\nAs you might imagine, my life in Tanzania was very different from the kind of life over here.\nFirst of all, while I was growing up, Tanzania was not an independent country.\nIt was a British colony called Tanganyika and the makeup of the country was such that there were British expatriates who governed the country and were in charge of all major institutions like banking and so on.\nThen there were Indians who had emigrated there from India and they were like the middle class of the country.\nAnd then there were the native Africans who comprise[d] the largest... part of the population.\nNow I grew up as part of the Indian middle class.\nI went to an Indian public school where I learned... courses in Gujarati and some in Hindi and stayed mostly in... in the community.\nThere was very little interaction between Indians in the middle [class] with European or or the British at the top and then the native Africans at the bottom.\nIn terms of everyday living, my father owned a small store and we were all expected to help in the store.\nIn a way that life was primitive but good. There were no such things as washing machines and dishwasher[s] and... all those kinds of things that make life comfortable over here, but it was nevertheless a a very pleasant way of living.\nI, I went to an Indian school and then completed... grade 12, which was K through 12, and then came over here to go to college, came to the US." 
  },
  "What factors influenced your decision to leave [Tanzania] and move to the U.S.?": { 
    id: 20, 
    category: "Early Life", 
    videoId: "DKU9CFeotMs", 
    transcript: "\nAs I graduated from high school, unlike a lot of the other students who were graduating with me, I wanted to go on for further education.\nMost of the other students generally got conscripted to work in their parent's stores.\nHowever, when I graduated, there were no universities or colleges or any kind of institutions of higher learning in... Tanzania at the time.\nSo the only way anybody could have gone for further education was to go abroad.\nAnd a lot of the students who did manage to go abroad generally went to the United Kingdom because of the relationship that Tanganyika or Tanzania had with England.\nBut in my case, I was actually more interested in going to the United States, if I could at all manage it.\nSo I, I applied for scholarships to go to the U.S. and I was lucky enough to get a scholarship to come to the U.S. for college." 
  },
  "What did you expect your life would be like in the United States?": { 
    id: 21, 
    category: "Arrival", 
    videoId: "8bmznIEOrEQ", 
    transcript: "I don't know that I was actually thinking about what my life would be like in the U.S. Mostly, I was just very excited about going to college.\n[I was excited for] the type of education that one can get in the U.S., the kind of extracurricular activities that you can participate in, and things like being able to date, and so on.\nAt home [in Tanzania], there was no such thing as dating.\nSo that, there was certainly a big factor for me." 
  },
  "How were you treated by Americans when you first moved to the U.S.?": { 
    id: 22, 
    category: "Arrival", 
    videoId: "-h28DjYkdJ8", 
    transcript: "Most of all, I was very, very excited about coming here to the U.S. However, the program that I came on the, the, the, the... the program people realized that I was coming from a \nvery different background and would have a hard time adjusting right away to the life in the U.S. So what they did was working through something like experimenting international living, which is primarily for high school students.\nThey arranged for those of us who are coming here on a scholarship to stay with the... with an American family for three to four weeks before we went to our universities.\nAnd this family [who I stayed with] was extremely helpful in... helping me adjust to the life in the U.S. They helped me go shopping and buy clothing.\nI certainly did not have any winter clothing, coming from a tropical country  [Tanzania], so I needed that.\nBut in addition to that, they helped me buy jackets and jeans and things of that sort that I would need.\nThey also taught me how to eat with [a] knife and fork. I didn't know how to do that.\nThey introduced me to American foods in their time period because I was not used to any of that.\nWhen I came here, folk music was extremely popular. This was around 1963-[19]64.\nAnd so I listened to to music at their house and became very fond of folk music, for example, things of that sort, you know.\nSo they [my host family] really helped me with the adjustment to the American way of life, which made my college life lot, lot easier than what it would have been." 
  },
  "What was a memorable experience from your early days in the United States?": { 
    id: 23, 
    category: "Arrival", 
    videoId: "MWMLCAsMyDc", 
    transcript: "If I can add one more or [a] couple more things about the family that I stayed with [when I first arrived in the U.S., right before I started university].\nThey were Quakers, which I knew nothing about, but it seemed like a very interesting religion and so I went to the friends meeting house with them.\nThey were also very liberal people, and this is in 1963. It was a time when... racial discrimination was rampant in this country.\nAnd in the August of 1963, there was the March on Washington, which Martin Luther King, and others, had organized.\nAnd while this family was in New Jersey, and I stayed with them in New Jersey, they took me to this march because they were going to the march themselves.\nAnd I will never forget that experience." 
  },
  "Describe your initial experiences upon arriving in the United States. Describe your experiences with activism in the United States. Did you engage with the Civil Rights Movement, how so?": { 
    id: 24, 
    category: "Activism", 
    videoId: "XgHWi6N_mjI", 
    transcript: "When I started working in Chicago, the administration and the staffing of the Chicago Public Schools was largely white.\nThe ward was white and it seems like all the high, higher level jobs went to the the white people.\nSubsequent to that, the African American community following up on the March on Washington and their civil rights activism, it started to agitate for appointment of African Americans to the ward of the Chicago Public Schools.\nAnd once they had about 25% to 30% of the board members, they they agitated for higher level positions for African Americans in the Chicago Public School system.\nSubsequent to that... the Latino community became quite active in the school matters and they also managed to get [Latinx] board members on the board of the Chicago Public Schools.\nAnd then, as a result of that, they were able to get higher level positions for Hispanics in the, in the administration of the school system.\nNow, I was there as an Asian and there were a handful of other Asians who were quite well.\n[We were] educated and very good employees, but we were not getting promotions like the Hispanics and the African Americans were getting, following the Whites in this in the system.\nSo we realized the importance of activism again, and we formed an organization for Asian Americans in the, in the Chicago Public school system.\nAnd as it happened during that time, the structure of the board members of the school system changed and there were possibilities of work sponsoring board members from the community.\nUp until then, the board members had been appointed by the mayor of the city of Chicago.\nSo we managed to get an... an Asian American to be on the board who then tried to remedy the situation with Asian teachers, [an] Asian curriculum.... and Asian positions into the, into the administration.\nSo there were some remedies made, but I realized then the importance of our organization as Asian Americans.\nSubsequent to that, we also realized that there were needs for the Asian American community, particularly the Vietnamese and Hmongs and so on, who... were generally not as part of this model minority myth that had been created.\n[This idea] that all Asian Americans are doing very well, they're very affluent, do well in schools and so on.\nAnd that was clearly not the case. And at that time, there was this organization of Asian American educators that we had started.\nThere was an Asian Asian American bar that the lawyers in the community had started and there were of course [a] number of social service organizations in the community.\nSo we decided to bring them all together under one umbrella so that we could act as one voice.\nAnd we initiated the formation of Asian American Institute, which eventually became the organization called Asian Americans for Justice." 
  },
  "Did attending the March on Washington in 1963 have a lasting effect on your life? What was the racial climate like when you came to the U.S. in 1963?": { 
    id: 25, 
    category: "Activism", 
    videoId: "nEsB9mVcKCg", 
    transcript: "Yes, [attending the March on Washington in 1963] did [have a lasting effect on me].\nFirst of all, I realized... how bad the racial situation was in this country, that they had to organize something major like this.\nBut it was also a good exposure to the type of advocacy that people in this country were doing in this March [on Washington] where it was primarily to take care of racial isolation and racial discrimination for the African American community.\nThere were all kinds of people who participated in this part, you know, the Whites and Asians and so on.\nSo that experience had a profound impact on me and it's something I have certainly not forgotten but have incorporated to some extent in my own life." 
  },
  "What aspects of American culture did find challenging or interesting ? How was your experience at college?": { 
    id: 26, 
    category: "Social Life", 
    videoId: "D5CO_9AdkH4", 
    transcript: "Initially, I was... at the university, so it was kind of like living in a bubble.\nThe makeup of the university at the time, this university that I attended, but near the university was only about 2000 big.\nSo it was a small college and most of, almost all the students were white.\nAt the time that I was there, there was one African American student.\nThere were two or three Asians, one from Japan, and a couple from China who were American born Chinese and the rest were all pretty much white.\nNow, within that, there were quite a few Jewish students and, as I come to understand later on, there was quite a bit of discrimination against the Jewish people also... on they have their own fraternity, for example, and most of them tended to be Jewish people, you know, male, female, whatever.\nAnd the the the Whites were mostly, Whites tended to take their own kind.\nSo it was that kind of a situation. \n\nI was not really prepared for social engagement in the student population.\nI had not dated before, so I didn't know how to go about that.\nI didn't immediately make a lot of [female friends] or even a few Asian, I mean white co-eds, as we used to call them.\nSo I, I, I did not really date that much in my, my first year there.\nPart of it was because I was not socially adept, but part of it was also because of the discrimination, I was not white and that was a big factor.\nSo that's how we went.\n\nBut beginning my sophomore year and so on, I became much more active.\nI had joined a fraternity and had made quite a few friends." 
  },
  "What was it like to date in college in the 1960s?": { 
    id: 27, 
    category: "Social Life", 
    videoId: "d0URcl-QPP8", 
    transcript: "I had made quite a few friends of both sexes and so on.\nSo I started dating and while in some ways I was still not entirely socially adept - being a foreign student had that certain appeal to some of the students, you know - they they were interested in knowing more about me and where I came from [and] so on.\nSo that helped me out. And as it happened, I actually went steady ... with a coed [a girl] beginning my sophomore year into the senior year.\nSo we went [out] together for about 3 years." 
  },
  "What is a story you can tell us about someone you dated in college?": { 
    id: 28, 
    category: "Social Life", 
    videoId: "lq0I1Iyb5Ng", 
    transcript: "Yeah, yeah, the person - we used to call the girls at the time 'coeds' - her name was Barbara Crockett, but with a name like that, she had always beginning [as a] kindergartner, so [since then] she had always been known as Davey Crockett.\nSo, you know, that's how, that's who I dated.\n\nShe was actually very cute.\nShe, she was really my best friend in college and I know that without her friendship, I don't think I would have managed to graduate through, through college because it was quite a demanding place for me and she was always there for me.\nSo I never forget that. After I graduated, I came to Northwestern [University].\nShe was a year behind me, so she graduated the following year and that year we had a long distance relationship.\nShe would visit me here at Northwestern [University] and I would go there, sometimes go back to Bucknell [University] to be with her.\nAnd I actually wanted to marry her, but she did not want to marry at that young age.\nAnd I asked her if she would come to Northwestern [University] so we could be together.\nBut she thought that Northwestern was like just another, just a glorified Bucknell.\nAnd she didn't want to do that either. As it happened, she got a scholarship to go to Harvard.\nSo she went to Harvard.\n\nAnd as you might expect, then we broke up at the time, but we still remained friends and stayed in touch.\nWork, I mean, being with me, she had come to understand and know about Africa and she was fascinated by that.\nAnd after she, after Harvard, she... after getting her master's at Harvard, she was a math major.\nShe went to...  she, she joined the Peace Corps and went to Kenya for two or three years.\nAnyway, we had stayed in touch, although we were of course not going [to be] together anyway.\nBut she died at a young age, the age of about 56, of skin cancer.\nOne reason for that might have been that in Africa, isotropical country, Kenya.\nSo she spent a lot of time in [Kenya] in the sun.\nOne of the other things that she did was she rode a bicycle from [the] East Coast to [the] West Coast here in the United States over a period of about 45 days all by herself.\nAnd there too, I think she was exposed to a lot of sun and picked up skin cancer.\nSo she's no longer with us, but I, I, I think of her a lot." 
  },
  "How has your experience been living in Illinois with your experience living in other parts of the US?": { 
    id: 29, 
    category: "History", 
    videoId: "DK598byaIy4", 
    transcript: "\nIn the United States, I have basically lived in two states for the most part.\nI have traveled somewhat to other areas, but in terms of living, I've only really lived in Pennsylvania for four years or so that I was in college, and then came to Illinois to go to Northwestern [University] and have stayed here pretty much.\nThe main difference in life over there versus life over here in Illinois is that Bucknell University, where I went to college is located in a very small town called Louisburg, Pennsylvania.\nAnd Louisburg, at the time, was about 7000 or 8000 in population.\nThere was just one main street in town, and a few stores, [a] couple of restaurants, and one cinema.\nBut that was about it, most of the social life really revolved around the campus because the town really didn't provide anything to speak of.\nThe life here in Illinois has been very different in that I came to Northwestern, which is located in Evanston, which is right outside of Chicago.\nChicago is a big city, over 3 million people just in the city, and in the whole metropolitan area about 7 million people.\nSo there was just a whole lot to do. So once I came here, I became really fascinated with the, the city life that I had not really experienced at all in Pennsylvania.\nSo it was very different in that sense. I started, for example, going to the Blues bars and jazz clubs and things like that, that I simply could not have done in Pennsylvania." 
  },
  "Were there any differences or things you particularly enjoyed about living in the U.S. compared to your previous life in Tanzania?": { 
    id: 30, 
    category: "Social Life", 
    videoId: "AmdwASDQI5Y", 
    transcript: "I think the the dating life, particularly since I came here as a student and have been a student or had been a student for, for a long time, both in, both at Bucknell and at Northwestern, the, the, the social life was quite intriguing and certainly very enjoyable.\nThe other thing that I could do, once I arrived at Northwestern and... had broken up with Davey (real name was Barbara Crockett) from Bucknell University, I met other people and dated at Northwestern and I actually lived with a Northwestern student for ... about four years.\nSo that was very interesting. The whole idea of being able to live together with your partner of opposite sex was certainly very enjoyable, like very intriguing.\nSo it was very different in that way. Not necessarily challenging, but very interesting." 
  },
  "How did you come to study in the U.S.? What were personal or global factors that allowed you the opportunity to come study in the U.S.?": { 
    id: 32, 
    category: "History", 
    videoId: "4oR2kNodFMA", 
    transcript: "I had applied for scholarships to universities in [the] United States and I was accepted at one university, Bucknell University.\nThe scholarship that I received was a program, was under a program called African Scholarship Program of American Universities, ASPAU for short.\nThis program came into being for the following reasons. What had happened was that in the 60s, [a] lot of the African countries were becoming independent and these countries did not have institutions of higher learning and as part of foreign aid, [a] number of countries, including [the] United States, were providing scholarships to students from these countries.\nBut the people who had organized this program had also realized that when students from those countries came to the United States, they were not able to cut it, so to say, in American universities.\nPartly because their educational background was somewhat deficient to begin with compared to American students, but also partly because of their cultural background, the languages, the kind of foods they ate, the kind of life they had lived, and so on.\nSo the foreign student advisors at a couple of universities that had taken African students before decided to create a program whereby the students who would be coming here would have a better chance of succeeding.\nAnd they did a number of things. First of all, they started giving SAT type of tests to African students in Africa to gauge their academic backgrounds and evaluate their success rates.\nBy the way, the states initially were very biased in terms of languages.\nAnd so the Americans were biased in the sense that they… were meant for American students and were were culturally biased.\nFor example, there are questions like questions that included words, words like dimes and quarters as part of the questions, which of course over there [in Africa] we would not know what dimes and quarters were.\nSo they had also then modified the SAT type of test to suit to, to eliminate these types of biases in the questions.\nBut the other thing that they they did was that once the students were accepted to participate in American universities, they asked students to come to the US about a month early before the classes began.\nAnd they arrange[d] for the students to stay with the American families.\nAnd the American families were were charged with helping the students with their adjustment.\nSo I stayed with the family in New Jersey, which is not far from Bucknell, which is in Pennsylvania, where I was going to be going.\nAnd this family helped me go shopping and buy winter clothes for example, that I didn't have.\n[They] also got me acquainted with American foods. They also helped me learn how to eat with a knife and a fork, which of course I I had not done before.\nWe always ate with our fingers at home.\n\nThis family was a Quaker family, so I also got an introduction to the Quaker way of life.\nI attended friends meeting houses with them. This family was also a very liberal family, which is, I think, one reason why they had agreed to take on a student from Africa.\nBut as it turned out, there was a big movement for racial equality in the early [19]60s.\nI came here in [19]63. \n\nThe Civil Rights Act was passed in 1964 under President Johnson after President Kennedy had been assassinated, which made a lot of racial discrimination illegal, and there were steps taken to… make sure that there was going to be more equality of the races.\nAs part of the fight for elimination of racism, Reverend Martin Luther King was a very prominent leader and in as it happened, in the August of 1963, while I was staying with this family, Martin Luther King and others had organized what came to be known as the March on Washington.\nSeems like close to a million people attended their that march, which eventually led to the passage of the Civil Rights Act 1964. But at that march, [a] number of prominent people spoke.\nMartin Luther King, of course, was the lead speaker and he gave a speech in which he talked about how he could see a time during which people would be judged not by the color of their skins, but but by the content of their character.\nAnd he talked about how he dreamt of that time and his speech came to be known as the I Have A Dream speech.\nThe the participants who were there, as I said, almost a million people, included not only African Americans, but also a large number of Whites who were very supportive of elimination of racial discrimination in the US.\nThere were also a number of entertainers or singers who participated, Bob Dylan sang Blowing in the Wind, which which had become kind of a national anthem for civil rights movement along with We Shall Overcome.\nJohn Baez was another speaker right or singer that I remember.\nAnyway, it was a very, very memorable experience for me and had quite an impact on me in terms of how committed the United States was to the elimination of racial discrimination and the kind of advocacy, the nonviolent type of peaceful movement that Martin Luther King had espoused and had carried on, partly having been influenced by Mahatma Gandhi in India, who also had initiated the peaceful resistance." 
  },
  "Are there any aspects of Indian culture or East African culture, traditions and lifestyle that you missed most coming to the U.S.? What kinds of food do you enjoy?": { 
    id: 33, 
    category: "Social Life", 
    videoId: "teEuBFsrx5c", 
    transcript: "Having come here [to the U.S.] at a relatively young age, I was 18 when I first came here and having lived here, the longest of any place I have lived, I do miss a lot of my heritage, and I I have lost at least some of it.\nFor example, the being [...] Tanzania and Swahili, I rarely get the chance to speak Swahili over here so I am very rusty when it comes to be able to speak Swahili.\nOur food in Tanzania, while mostly Indian, was also significantly affected by the African cuisine over there and the presence of local ingredients like coconut is very prolific in in Tanzania, so a lot of our dishes tend to have coconut in them, kind of like the Thai food here.\nSo I I do miss the food that I used to have, but of course I've gotten use to the burgers and whatever else.\n" 
  },
  "How have you maintained connections with other South Asian or Asian immigrants and did you form relationships with people from different backgrounds?": { 
    id: 34, 
    category: "Social Life", 
    videoId: "k4OmBp_qBrg", 
    transcript: "Actually, when I first, when I first came here, there weren't that many South Asians or even Asians, so... and certainly while I was at Bucknell [University], you know, there, there were hardly any.\nAnd then subsequent to coming here, there's some, but not that many.\nBut following the Immigration Act of 1968, there has been a rapid increase in the population.\nSo there are many more Asian restaurants, Indian, Thai, Japanese, Vietnamese and so [on].\nSo I've been able to participate upon all that and have made friends with a number of other, some Asians in particular.\nBut one of the other things I had come to realize was that the while we all had tendencies to hang around and identify with our own subcultures like South Asian, Indian, Pakistani and so on, that we have much in common with the other Asian American communities: Chinese, Japanese, [...] Thai, etcetera.\nAnd that there is an advantage to all of us banding together and coming together.\nSo I have made it a point to not just stick to the Indian or Pakistani or South Asian communities, but to interact with people from other Asian countries also." 
  },
  "What type of activism or leadership have you engaged in? Why did you co-found the Asian American Institute?": { 
    id: 35, 
    category: "Activism", 
    videoId: "oqEHAH4icaA", 
    transcript: "In the United States, in general and the Midwest in particular,  there are a number of Asian American organizations.\nSome of them are studying space and stuff and help new immigrants settle down.\nSome of them are professional organizations, like the [Asian American] Bar Association or [Asian American] Education Association.\nBut there was no organization that did advocacy on the behalf of the entire [Asian American] community.\nAnd in particular, we realized that our numbers in the political process were very limited to [Indian school obligations] for whatever beings were inclined to get into politics and have voices heard...\nSo, one of the main things that we made it a point to do, with the founding of the Asian American Institute [now Asian Americans Advancing Justice - Chicago] was to encourage and support any candidates who may want to join politics and become representatives in the government.\n" 
  },
  "What was the hardest part of life in those early days of the institute?": { 
    id: 36, 
    category: "Activism", 
    videoId: "6F_8V0uHAeM", 
    transcript: "Yeah, when we first founded the institute, which was in the mid 1990s... we really did not have an identity as Asian Americans.\nYou know, most people tended to identify themselves to Indians, Pakistanis, Chinese, Japanese. So what.\nSo one of the main things that we felt we needed to do was create that joint identity and help people of different ethnic backgrounds coming together and working together.\nThat was one reason why we also organized the first Asian American Film Festival to show films by and for Asian [...].\nThe kinds of films we showed were not... entertainment per se, like romance stories or anything like that, but they were more issue-oriented, you know, they were based on history of Asians Americans and skill.\nThe Chinese, for example, building the railroads, how they were treated and so on.\nSo we tried to create a joint identity also by educating people about what our history is [...].\nSo that was the hard part in history of it.\nWhat's happened subsequently is that, so since the immigration act of [1968], that has been a large influx of Asian Americans.\nThose kids now are grown and are in various professions and so on, and they are much more inclined to join forces as Asian Americans rather than Chinese, Japanese, and so on.\nThey're also, of course, highly educated and often have been in important positions, so theyre able to do much more for the community than, let's say, our cohort.\nSo that's been a big, big  [...], what the young people are doing right now is so much more than I think we were." 
  },
  "What advice would you give to future generations of immigrants pursuing their own American Dream?": { 
    id: 37, 
    category: "General", 
    videoId: "1BMuh33RYTnmm7uAMk92pMGuQZcI8DEHY", 
    transcript: "Before I came here and when I first came here in the early [1960s], while the racial situation was pretty bad in the country, technologically and perhaps in many other ways, the United States was the best country which you could be in. Unfortunately, this has not worked out until the present time.\nParticularly in the last... 10 years or so with [the] coming of Donald Trump, for example: it seems like we have taken steps backwards.\nThe racial situation is pretty bad; violence has increased. There is no desire to do anything about the number of guns we have in this country, for example, which exceed the number of people in the country.\nSo things have kind of turned around the [...] and I, I, I can't say that the country has advanced the way it should have been and therefore, our place in this country, whether that has advanced the way should have been." 
  },
  "What challenges did you face in education?": { 
    id: 38, 
    category: "Education", 
    videoId: "1cdH5bFME_K92lxgGxiig9XFEM-FbB82q", 
    transcript: "There there were no real challenges in the pursuit of education.\nInitially, when I first came here, obviously my English was not very good,... so that was difficult.\nI could take courses in chemistry and physics and math and so on, and that was not so bad.\nBut as part of the liberal education in this country, I was also required to take courses in English and British literature and so on, which had been difficult for me.\nFor example, the English, the Frenchmen English that we all had to take, in the first semester, our reading list was comprised of about eight different books.\nNow, up until I came here, my ability to read an English book was roughly one book every three months or so it would take me to finish going through it.\nAnd I used to read Agatha Christie, interesting stories like that that would grip me so that I would be interested in finishing the book.\nBut here, you know, I was given kinds of  different books as part of the English course.\nSo it's very hard to to go through all that at the same levels as the rest of the American students.\nThe other thing was that it seems like in high schools, maybe like middle schools, earlier, American students read and write book reports.\nWell, I had never written a book report before. And as [a] part of this English course, we were all required to read certain books and write books, quite hard for me.\nI was also asked to read some poetry, and that also was very hard adn we had to write a paper on it.\nIt was difficult. On top of it,  I did not know how to type, so that didn't help either.\nSo it was challenging in that way, but no other real problems as far as education I was concerned." 
  },
  "What challenges did you face in securing or maintaining suitable housing in the U.S.?": { 
    id: 39, 
    category: "History", 
    videoId: "1DKAQfZVrHEJz1vM2VU6eTbG3D7L7ufSv", 
    transcript: "When I first came here to go to college [at Bucknell University], I had to live in the dorm because [it was] pretty much required so housing, that was not an issue.\nWhen I came to Evanston to go to Northwestern [University], there was a shortage of graduate-level housing, so we could not live in university-level housing… so we had to to rent something.\nAnd I was here on a scholarship also so I had a limited amount of money and had no real ideas about the rental market worth and what rent rates here were.\nSo I just assumed, that once I came here from Bucknell, that I would be able to rent an apartment and continue with my courses.\nAnd what I found out was how much apartments were renting here and how [small] my stipend that I was going to be given [was].\nI could not afford to have an apartment. I didn't know what to do, and my classes here were going to be beginning soon.\nSo I didn’t have much time either.\n\nSo I went to see my foreign student advisor to see what I could do, and we suggested that the best thing that I could do was get a room in somebody’s house: that there were people here with big houses, and they had extra rooms.\nAnd they were just renting out rooms, and I might just get a room, instead of an apartment.\nSo they think, we also maintained a list of rooming houses that were available.\nSo he gave me the address of one of those houses, and I went and got to the lady who owned the house.\nAnd I rented that one room right there that I could afford.\nNow, what happened was that, the next day, another student who had come here from Turkey, went through the same thing.\n[They] couldn’t get an apartment and went to see the foreign student advisor, and the advisor sent him to the same address.\nAnyway, so this other student also came over to the same address and he rented another room over there.\nThen one day, just about a week before Christmas when the [school] quarter was going to be ending, I came home having studied at the library and found out that this lady, who had rented rooms to the two of us, had kicked us out before she and this other student had gotten into some kind of argument.\nAnd of course I have no idea about what tenants rights we had or anything.\nSo we were both kicked out on that same night, so we ended up at the [YMCA].\nAnd then we realized that while neither one of us could afford to get an apartment, if we combined our stipends that we could rent an apartment.\nSo we went ahead and rented an apartment, so we were there for the rest of the time, pretty much.\nI'm still friends with this guy in Turkey - we visit each other and so on and so forth.\nSo, but after I graduate, I mean, after I graduated and started working for the school system and was making good money, I bought that house that was kind of rundown but had been subdivided into 4 units - after the war when the GIs [U.S.\nsoldiers] came back there was a shortage of housing, and so the city had left some big houses [that] they subdivided into separate apartments.\nSo I bought a building like that: I lived in one and rented out the other three units [of the four].\n[I] rented out the other three units and made improvements, and so on, so  that was my experience with housing." 
  },
  "What challenges did you face in securing or maintaining suitable Housing?": { 
    id: 40, 
    category: "History", 
    videoId: "1cqR_NsEC9QE8W7zzNn3YQ_25zBT4zyih", 
    transcript: "So after I started working I saved some money, but the the culture in my community and in others is that you don't really rent places.\nSo the sooner you can buy your own house and can free it up the better.\nSo I was programmed to do that. So I bought this one property that after the war had some... [it was] a large house that had been subdivided in four units.\nAnd I lived in one, and I rented out the others.\nAnd as each unit became vacant between tenancies, I made improvements to it.\nAnd eventually, I improved the whole building quite substantially on the electrical, moved some walls, added some [...], and so on and so forth.\nSo quite a project. It took me about five years to get that building in shape.\nAnd I realized that I had really liked to have done that.\nI'd enjoyed the work and built a level of satisfaction with what I had done.\nAfter having fixed up the first property over a period of five years, I refinanced it and got quite a bit of cash out and then bought two other 'two flats', which I worked on... rehabbed pretty much totally and then rented them out.\nAt that point, I realized that while I liked doing the work, I did not like dealing with tenants so much and their problems, needs, and so on.\nAnd that if I was to continue like that, I would need to get a full time janitor or assistant to help me take care of the leaky faucets and the switches , that work... So, but I also realized that in order for me to have a janitor like that, I could not rent a total of 6 units.\nEither I needed to do more of it - or not do it - and I decided to do more, and eventually got [...] something like that, at full-time.\nThey think of working for me to take care of all that.\nI got a management company to manage the apartment so I don't have to deal with it, but I just got a single family place that I, I live there with my wife.\nSo my job, education, [...] and all that kind of stuff helped me get into this kind of work." 
  },
  "What challenges did you face in accessing Health care?": { 
    id: 41, 
    category: "General", 
    videoId: "1i_h2zrfBoJsckBAzV4vvBqsSm1ciEySn", 
    transcript: "\nHealthcare again, for me healthcare was not really a problem that I know that it is for many people.\nWhile I was in college, of course, the university provided all the healthcare we needed.\nAnd then when I worked it was part of the employment benefits that I had.\nBut then, once I stopped working, so I was able to [get] involved in Medicare, for seniors.\nSo I have transitioned pretty easy from one type of health care to another." 
  },
  "What challenges did you face in social support?": { 
    id: 42, 
    category: "General", 
    videoId: "11CE9rzxVrt-FGaktX0P1ZXF5-sPyft2F", 
    transcript: "Social support also has not been... a big issue or a challenge for me.\nWhile working, of course, some of my social connections we had with respect to the people that I worked with, my colleagues there.\nHousing - the university set [that] up for quite a while, there too I [had] connections with them, people I associated with, and subsequent to that, I got involved with some advocacy type organizations.\nSo my social connections were through that." 
  },
  "What challenges did you face with Financial needs?": { 
    id: 43, 
    category: "General", 
    videoId: "1qGLI2Lm9_1f6Bn2qpCpWbVB4Xu437pYF", 
    transcript: "There, in terms of financial needs, also, I have been strangely lucky.\nI had a good education, I have worked hard, I have lived a relatively frugal, simple life.\nSo money has not been a particularly big issue for me." 
  },
  "When and where were you born ?": { 
    id: 58, 
    category: "Demographics", 
    videoId: "1j6FnrkUUcTxMJlu4rd0V68K-Q23tIpFC", 
    transcript: "I was born in Tanzania in East Africa in 1943." 
  },
  "How did you come to the U.S.? What was it like coming to U.S.? How were you inspired by the Civil Rights Movement?": { 
    id: 59, 
    category: "History", 
    videoId: "11oz2ViX3RFA1Hvl5st2xTdmZjeXDWHIA", 
    transcript: "I I came here on a scholarship program and the organizers of the program had realized that… me, along with other students who came here on the program, came from very different cultural backgrounds and, as a result, would have difficulty being in a university environment where the academics would be hard enough, but then we would have the added difficulty of living in a cultural background that was not ours. So they arranged for us students to live for about a month or so with American host families who would \nhelp us with our adjustment to the American way of life. And the family that I lived with was in New Jersey, close to Bucknell University, where I was going to be going [for college]. This was a Quaker family, and they were a very liberal family.\n\nThey helped me do some shopping for winter clothes that I didn't have. They exposed me to American foods, American Music, and amongst other things. [They] also taught me to eat with [a] knife and fork, which I was not used to doing.\nBut as it happened during that month of August that I was staying with this family, there was this March on Washington.\nIt had been organized by Reverend Martin Luther King and others to bring attention to the state of racial discrimination, particularly for African Americans, in this country, and how that needed to end.\nSo this family [I was staying with] was going to be going to the March on Washington, and they invited me to go along with them.\nI did not fully understand what the march was all about and what the extent of racial or the discrimination there was in this country, but I was of course interested in going with them.\nSo I did, and it was a truly amazing experience for me. There were almost a million people there.\nThere were dignitaries like Reverend Martin Luther King - and others - who was one of the main speakers at the march, and he talked about how he dreamt of a time when there would be equality in this country and that people would not be judged by the color of their skin[s], but the content of their characters, what came to be known as the “I Have a Dream” speech by Martin Luther King.\nThere were also prominent singers there who had been contributing to the Civil Rights Movement through their songs.\nBob Dylan and his [song] 'Blowing in the Wind', for example.\nPete Seeger with his [song] 'We Shall Overcome', which became an anthem for the Civil Rights Movement in this country, so on.\nSo it was really a… day-long march that was… very impactful on me… in several ways.\nI realized what advocacy was about, what what peaceful marches were all about.\nMartin Luther King, of course, had learnt about the passive resistance and peaceful marches through Mahatma Gandhi in India who fought for independence for India… through peaceful resistance.\nSubsequent to that, as I, as I started working in Chicago, I realized that there was discrimination against the Asian American community also.\nIt seemed like the power structures seemed to lump all Asian Americans together, and they had propagated this myth about the 'model minority', that Asian Americans really did not need any help.\nThat they did very well financially, in business and jobs, and so on... In schools.\nBut that was clearly not the case for some communities, like the Vietnamese and the Hmong communities we're not doing very well.\nA lot of cab drivers, Indians and Pakistanis, for example.\nThere was a lot of… abuse of women and even in the homes, and so on.\nSo there was a need to do a lot for the community.\nAnd so  we realized that we also needed to organize the way the African Americans had organized and we needed to fight for our communities.\nAs it happened, there were organizations like the Asian American Bar Association made up of attorneys - Asian American attorneys.\nThe educators had organized under the Asian American Educators Association.\nAnd of course, there were a lot of social service organizations there too, helping recent immigrants from Asia.\nBut there was no real advocacy for the community as a whole, [so] some of us got together and organized the Asian American Institute, which later became the Asian Americans Advancing for Justice, which of course still continues and is acting on behalf of the community." 
  },
  "What opportunities or achievements did you experience in the U.S. that you might not have had in Tanzania?": { 
    id: 60, 
    category: "History", 
    videoId: "19dqEZQeqGSx9K-s5e-L_21jbsXxDa74H", 
    transcript: "As we all know, America is the land of opportunity, and it's the land where anybody can do anything and get anywhere.\nSo in that sense, I too have benefited. First of all, I got [an] education, not just at the bachelor's level, but... also master's degrees as well as PhD degrees, which I could not have [gotten anywhere else].\nWhat were the benefits that an education like that provides in terms of financial success, and so on: it's just remarkable that I could get that level of education just as a person and the impact that that has had on my own life.\nI was able to date through college and eventually [I] married an American woman, which of course I could not have done [in Tanzania], and that also had a big impact on my life.\nMy wife was a big feminist, so I grew a lot, just being around her, as a person.\nI also happened to come here at a time when rehabbing of old buildings was a big thing that people of my age would get into.\nThey would buy a rundown home, for example, and fix it up to meet modern needs and so on.\nAnd... I did that too, and did quite a bit of work myself, which of course I was also able to do because there's so much information one can get on YouTube, and there are places like Home Depot, and so on, where you can buy a lot of things that you would need to fix a place up.\nSomething like that, suddenly, did not exist in Tanzania, where I came from.\nSo there were a lot of opportunities like that [here in the U.S.].\nI did not discover or invent the cell phone or the personal computer and all that, but I suddenly used all that [available technology] and have benefited from that [living in the U.S.]." 
  },
  "So what kind of work did you engage in when you first arrived or when you first graduated?": { 
    id: 61, 
    category: "Career", 
    videoId: "1pYb6EUnknFprHuXAOhvlzqSaWfGFfp_d", 
    transcript: "After graduating, actually even before I finished my PhD, I happened to be hired by the Chicago Public Schools because they were looking for somebody to help them with the planning of the schools.\nWhat had happened was that in the early [1970s] the school system had embarked on... a major construction program whereby they had built a number of schools using a total funding of almost $300 million.\nAnd what happened, subsequent to that, was that there were upheavals in the city and there were major population shifts.\nSo some schools that they had built ended up being underutilized and had to be closed.\nSo they realized that they needed to do a better job of planning for the schools as to where they built schools and where they closed down schools and so on.\nAnd they were looking for some help, but from professionals in that regard.\nAnd they had contacted Northwestern Universitiy and their urban studies and urban planning programs to see if there are people there who could help.\nAnd one of my professors, I was a third year student at the time and had been taking courses that were quite relevant to this, solving these kinds of problems.\nSo my professor recommended to the head of the school planning department in the public schools that this student might be able to help you.\nSo I started working with them as a consultant. And even before I finished my degree, the head of the department asked me to join them as a full time employee.\nSo I started working there full-time and graduated afterwards.\nSo in a way, that's really the only job I have known.\nI ended up working there for about 20 years, but I got a very good understanding of how cities work, the politics that are involved in city administrations, and a good understanding of the  different neighborhoods in a city like Chicago and how neighborhoods change and how certain neighborhoods get better and certain neighborhoods get worse and so on.\nWhich eventually helped me make some investments in real estate because I had come to know the city pretty well.\nSo it helped me personally that way, just having worked there." 
  },
  "Were you treated fairly in terms of salary or opportunities? Did you gain recognition for your work? Did you notice or experience discrimination in the workplace?": { 
    id: 62, 
    category: "Career", 
    videoId: "1jbIvU-LsxGQx_h_v7dUb2GtFHlCE30to", 
    transcript: "By the way of working for the public schools... and and having basically come from an academic environment and not having known any other types of... jobs, I came to realize how much race played in terms of the employees in the school system advancing.\nInitially when I first worked there, the administration was mostly white and all the higher level jobs were taken by the whites.\nSubsequent to that, the African American population was agitating for better jobs and better opportunities and they had managed to get board members on the [school] board who then helped to get African Americans in higher level positions in the, in the school system.\nSubsequent to that, there was the Hispanics who were coming up in ranks.\nTheir numbers were increasing and they, they too had managed to get the [Hispanic] board members on the [school] board and then the board members helped the [Hispanic] employees in the system to advance.\nBut there was nothing being done for the Asian Americans who were working in the system because we didn't really have a voice at the board level.\nAnd as, and as it happened, the structure of the ward changed whereby the communities could sponsor a certain number of board members.\nAnd the Asian American Students' Association that we had formed helped to sponsor an Asian board member who got on the board and not only helped other [Asian] employees advance - whose employment advancement had been significantly curtailed - but he also helped to introduce Asian American history in the curriculum.\nHe made sure that certain neighborhoods like the Chinatown, for example, which had had a very old school for a long time, would get a new school.\nThings of that sort, that that happened." 
  },
  "And what advantages or disadvantages did you have professionally?": { 
    id: 63, 
    category: "Career", 
    videoId: "1JWMZ98XbzDibebO_NHCLLYJaajmdKPkz", 
    transcript: "The advantages that I had was mostly the education that I had received... Which seemed very relevant to the kind of needs that the public school system had. The main disadvantage was that I was an Asian and that that there was a ceiling to how high I was going to get in the organization." 
  },
  "Did you notice or experience discrimination of Asian people living in Chicago?": { 
    id: 64, 
    category: "Activism", 
    videoId: "16flbBQUhNv8ZxxXcu8wPnpj-IfmnxPRP", 
    transcript: "In terms of my own experience, the main... instance of discrimination I have experienced has been with respect to the job \nwhere the Asian Americans were not being promoted as much as they should have been considering what they were contributing." 
  },
  "How did you cope with racism and discrimination professionally or otherwise?": { 
    id: 65, 
    category: "Activism", 
    videoId: "1rUtLzZyJ3AtIK4-J7bmWXAGYkvOiE2fE", 
    transcript: "The main discrimination I get, encountered has been with respect to the jobs... whether Asian Americans were not being appreciated the way they should have been, since [given] their level of education and for what they were contributing.\nOther people seem to do better, you know, [people who were] politically well connected.\n[We were in associations], but once we got the Asian wardman[and the board], things have changed. So there was that.\nMy main way of coping with all that was that, while there was discrimination,  I feel like I was enjoying the work that I was doing and I was learning from it.\n[...], learning about the city through the job, which is always fascinating.\nAnd that that job gave me an opportunity to really get around in the city... quite a bit.\nSo I got to know the neighborhoods and some of the fellow community people that just [...] themselves and [...] for so long.\nThat was very good for me.\n\nIn terms of personal level of discrimination, it has been much more subtle because I have generally been in fairly educated environments - around people who are well educated.\nAnd they're not the kind of people who can say, you know, \"you're this color so you cannot do this\" or \"you cannot come to this event or this function or to our place\" or something like that.\nIt [the discrimination] was much more subtle while [they were] doing it. So it's hard to fight with that.\n[...] In some ways I suppose I have just learned to live with that." 
  },
  "How did the political or global relationship between the U.S. and India impact your life? How did it impact how you were treated by Americans in general?": { 
    id: 66, 
    category: "General", 
    videoId: "1P2DgIZZvKK9SnXQEkIuzbCwkhPiiRKdJ", 
    transcript: "The relationship between [the] U.S. and India has not really had a particular impact on me, although the relationship has been often [...] from time to time, I'm not that strongly identified with India.\nI knew that the relationships between Indians and Pakistanis [were tense].\nNow I am not a Pakistani, but I am a Muslim.\nSo relations between Indians over here among Pakistanis [here], from time to time, has been volatile, and they [Indians and Pakistani] will get into issues with each other based on, for example, [what is happening] in the home countries.\nNow, I myself have really not been affected by it... but I have been troubled by what's happening  in India right now in the prime ministership of the Prime Minister Modi.\nHe has been anti-Muslim and has turned some of the Hindus in the country against the Muslims in India.\nAnd there has been a lot of violence between Hindus and Muslims in India, which of course I don't like.\nIt doesn't personally affect me. But I just, I'm sad to see that's what's happened." 
  },
  "Do you participate in cultural or religious activities?": { 
    id: 67, 
    category: "Social Life", 
    videoId: "1jWUBH6Do-plwGpqfLAg_hsH0VSuROXZC", 
    transcript: "Yes, I'm not religious so I don't participate in many religious activities.\nWe just had the month of Ramadan for example where a lot of Muslims fast and I did not fast.\nAnd at the end of Ramadan is the holy day of Eid. Which of course, I also don't celebrate.\nSo in that sense, I don't maintain my cultural heritage.\nI do associate with a number of other people from my community.\nSo things there... are a lot of the Indian heritage that I have actually comes from watching Bollywood movies back at home.\nThey were really popular and we all religiously went to [the] cinemas every week and that continues here now with the streaming services that are being at once and so on.\nSo I I do maintain that part of my heritage.\nAnd so it is here and more fun to do it now with all the platforms are available.\nSo I do that. " 
  }
};
const MARIAMMA_QUESTIONS = {
  "What is your name?": { id: 1, category: "Demographics", videoId: "3JtlbmT4VZ8", transcript: "My name is Mariama Thomas." },
  "Do you have any siblings?": { id: 48, category: "General", videoId: "iauJu1UldxA", transcript: "My I am one of the eight in my in my family and I was the 7th in line and they all were, they all passed away. They all there passed away in their 90s and I am the only one left in that in my family." },
  "Who is in your family?": { id: 43, category: "General", videoId: "09_VSQ1DhLI", transcript: "My husband AG Thomas and we have 4 grown up daughters. My oldest one's name is Berry and she is a math teacher in and teaching at the closer to the city. And my second one is Sheila. She is she is a assistant Dean at at Harvard University in Boston. And the third ones are twins and the one her name is one of them is Suja. Her she is a professor at And the other, the other one is she, her name is Suma. She was at as a cardiologist in an Cleveland Clinic in Cleveland, OH." },
  "What do you enjoy doing? What do you do for fun?": { id: 45, category: "General", videoId: "dINAMEJlBTk", transcript: "I like to read, I enjoy reading and I enjoy baking and also I used to swim for a long time and I miss that because they don't have a pool here. And I, I go out for breakfast with friends and also we have friends from the pool, long time friends we go for for coffee and breakfast once a month and it I enjoy those outing and also, you know, being with friends and and I enjoy the family also. You know you will have. I love to be with my family also." },
  "Where and when were you born?": { id: 5, category: "Demographics", videoId: "VCKsl-e-0ns", transcript: "I was born in in Malakara, India state of Kerala. My birth date is January 25, 1930. I am one of the eight in my, in my family, and I was the 7th in line. And... they all were, they all passed away. They all ... passed away in their 90s, and I am the only one left, in that, in my family." },
  "What do you enjoy doing?": { id: 45, category: "General", videoId: "dINAMEJlBTk", transcript: "I like to read, I enjoy reading and I enjoy baking and also I used to swim for a long time and I miss that because they don't have a pool here. And I, I go out for breakfast with friends and also we have friends from the pool, long time friends we go for for coffee and breakfast once a month and it I enjoy those outing and also, you know, being with friends and and I enjoy the family also. You know you will have. I love to be with my family also." },
  "Are you religious? If so, what is your religion?": { id: 46, category: "General", videoId: "qb-lNhdzCIk", transcript: "I am religious. I am, I am a Christian, and I belongs to [a church] here [near my senior living place]. I [attend] a Methodist Church, and I enjoy going there. Right now, I am unable to go in this winter time. I was not able to go and I could... They give a ride in the bus, they could take us in the bus, to the church. But in some time, I did not go. And in, in other times, like, you know, when we were in Iowa, we were.. we were going to Presbyterian Church. And my children were born here [in the U.S.] and baptized there. And they also grew up in that church for 17 - 18 years. And we all enjoyed the going to church, you know, and we have so many friends in the in the church as well as in the community." },
  "What is your native language ?": { id: 47, category: "General", videoId: "-Zlo1SoDDWA", transcript: "My native language is Malayalam, and I speak also English. And I mostly speak English ... now and also to my children when they were - even when - they were babies, we talk to them in English." },
  "Do you have a spouse or a life partner?": { id: 48, category: "General", videoId: "ki40KRSerlo", transcript: "I was, yes, I was married, but my spouse passed away in 2005. And his name is AG Thomas." },
  "What language did you speak with your children?": { id: 87, category: "General", videoId: "PFN-DyQXEfU", transcript: "We spoke, we talked to them or we spoke to them only in English, even when they were babies because... my husband especially was very concerned that when they go to school, they will get confused with English with ... our mother tongue... so that was one reason and I think the only and one reason... we talked, we talked to them in English. And they, even when they were older, they think that we should have talked to them in our mother tongue also." },
  "When did you come to USA ? When did you meet your husband?": { id: 50, category: "General", videoId: "OypVBBcUoEM", transcript: "I came here in United States in February 1961, and in three weeks [after that] he [my husband] came to see me from Boston with a friend. And that is how we met the first time." },
  "What is your education? What did you study?": { id: 62, category: "General", videoId: "O1tU8VozVvI", transcript: "I went to Chengannur for my education, and I graduated from high school in Chengannur, India. And then I went to college for two years and wanted to be a teacher. But as... when I finished my two years of college, I didn't want to be a teacher. I said to my parents \"no, I don't want to be a teacher, I want to go for nursing.\" And they were not that keen about sending me to nursing school because... nursing was at that time was not a very respected profession, because the girls will be taking care of men - and that was a, a taboo you know, I should say. So anyway, my, one of my brothers said \"if she wants to go to the nursing, let her go,\" you know. So finally ... my parents said, OK, you know, \"you want to go to the nursing school? Go that is OK,\" you know. So they, they agreed to let me go to the nursing [school]." },
  "How did you meet your spouse? How did you meet your husband?": { id: 52, category: "General", videoId: "3h3qtrtoH8w", transcript: "He came to know me through a friend [who] said that, you know, somebody from his state area and his home area is here. So he was interested to and looking for to get married - and was interested to see someone from Kerala. That's how he came to see me." },
  "What was your life like in India? How did you come to the United States?": { id: 13, category: "Early Life", videoId: "vdAs8JUNTmc", transcript: "I grew up in in Kerala and and I had my [training]... I graduated and then I went for nursing. And once I went for nursing, then I had my, then I [found] a job in Assam that was quite far away. And I flew from Calcutta to, to Assam in a cargo plane because there was no airport there [in Assam]. So I flew in a cargo plane which I did not even know... there was a light there or any people there. I could not see anything. But I managed to stay, and I had a big, big suitcase there in, in there with me. So people, everybody, the relatives [who] came into the airport in Calcutta said, \"if you, if you get any in trouble, if you have any problem, just push the... push your suitcase down, and so you will be safe then. So anyway, I, I was in the cargo plane and landed in a, in a small road, where where this place, where I was going. nd I went there and then some people came and picked me up. And I went and stayed in a place, in a house there they provided me, and I was there for maybe a year. And so I was, I was OK there. And then I moved to a different place which was bigger than that. And then it was a British oil company and they had a hospital there. And then it was there - also was tea production, also there. So, you know, I had ... two of three of my other friends came from Vellore and stayed with me for another two more years, and then I found this job in the United States, to come [to the U.S.]." },
  "Where do you live currently? Where do you live now?": { id: 54, category: "General", videoId: "FF8ppSVOUXM", transcript: "I live in the suburb[s] of Chicago: Naperville. That's where I am. I live in [Naperville]." },
  "Do you have siblings? Who did you grow up with? What did you do when you were young?": { id: 88, category: "General", videoId: "aMOmamGsB28", transcript: "I was 1 of 8 children, and I was the 7th one. And I had a younger brother, and I always took care of him, and he was five years younger than me. And all my sisters and brothers got married, and they were or somewhere... they were working some place, you know, in outside of Kerala. And my sisters all got married, and they have family. And they, I told my when I graduated from high school and ... from from college, my parents wanted me to get marry. I said [to my parents], \"I do not want to get marry, you have grandchildren and so enjoy the grandchildren. I do not want to get marry, but I want to go for nursing [education].\" So they were not happy [about that], but because my brother said, you know, \"it is OK to go,\" so they were happy to send me. So that is what happened, you know... that I found, found... and I went to Vellore and I had my nurse's training." },
  "What did you do for a living or what job or career did you spend the majority of your life working in?": { id: 56, category: "General", videoId: "UTPqCmnFE_g", transcript: "I am a registered nurse and I worked all my life as a nurse as a registered nurse." },
  "How would you compare your experience in Iowa with living in the other parts of the US?": { id: 57, category: "General", videoId: "RpMD-IlGHdY", transcript: "We lived in Iowa for 37 years. My husband was a professor at the at Buena Vista College and my children, three of my children were born and brought up there. And Berry was born in Newer and Hackensack, NJ, but we moved to when she was nine months old. She we moved to Iowa for my husband to take the job and I work there too. But when we were when the kids were growing up, I did not work. And when they were maybe 5-6 years old and they were in school, I went to for some part time work, but the place was there was number. We were the only outside of the white community living there. We were the only colored people you should say could say living there. And most of the people where cordial and also nice to us and to the family and respected us. And of course, you know, there were some were not that, you know, jealous and because we were educated and also so because of that, you know, there was some problem with the discrimination and ratio differences. My kids were in high school and they were, they were playing good, good tennis players. So they went to play tennis on college campus court, college tennis court. And they were playing and these football players, they come early and then they practice there. But when they saw my children playing there, they, they said you, you someday they called some names and they said go home. And they were, they were very insulted. So they came home crying and they were in high school kids, you know, they, they came home crying. And my husband and I called the president of the university and he was he said I am sorry and I will take care of it. He said he send he send a note to the football players, said you all sign your names and tell them that you are sorry or excuse them. So they, they said, if you don't do it, you know, I will take action, he said. So they all signed their names and sent to us the, the, they signed the paper. So that was one instant. Then they were in high school. Some of the girls, you know, my kids were very good students and also well behaved girls. So the teachers really like them very much.And they were good sportsmen too.So they maybe they were some of them were jealous and they said, they said they, they wrote actually some notes and then put it in their lockers, you know, calling some names, you know, and that was take action taken by the teachers when they found and then they were shopping for a birthday present for their friends in a department store. My girls, all three of the three of them were shopping and then they finished shopping and they bought some gifts and were coming back to their car.And then this girl, the clerk or the the the girl who will take took care of them or the people under in the counter, She said those girls here, they stole something.So the manager told the manager, the manager came running and took the pairs from the Berry. My daughter and he searched the purse and he did not find anything except the gift that they bought. So he they were, they were really surprised what he was doing and they were not very happy about it. So he left and then they said we do not want his and this. So they returned that. They went back to the store and returned that and they came back came home crying. See this guy did that to us. You know, we never, never steal something, never stole anything, never life. And they and so they came home and crying. So what we did was we I, my husband was not there and I called my husband and I called a neighbor who was a lawyer, who was the critic owner from us and he was a lawyer. He was a very good neighbors.They were very good neighbors. And he said the I know these children since they were small babies, they know how what they are. So I am going to call them call him and ask what I can take care of it. So he called him and said, I hear that this Thomas girls came and he used search their purse and see and they they since they were babies, I know them. I know each one of them. So you better send a pardon and to them writing all of their names and ask them pardon. If not, I will see you in court. So he actually sent, called us and said, you know, he fell, he felt bad, he was sorry, he didn't mean to do that and all that.So that was that." },
  "So tell me about life in India and then also how did you come to the US?": { id: 53, category: "General", videoId: "Ldc8Oxqu_Kk", transcript: "In India, you know, I had my nurses training in Vellore, one of the best hospital, medical medical school as well as the nursing school at that time. And I had my nurses training there for four years and then I stayed and worked there for two years. Then I also moved to Assam. I took a job in Assam in an oil company hospital. That's where I spent the time before I came into the United States." },
  "Did you encounter any instances of racism or discrimination?And how did you cope with these challenges? So tell me about some of your own personal experiences.": { id: 58, category: "General", videoId: "sNX8OLNgXms", transcript: "My one of my twins, Suma, was at Northwestern in Evanston as a student and her third they all my girls went to Evanston for for undergrad. On her third year, she said, you know she wants to move to Creighton University in Omaha. So she transferred to Creighton University in on her third year. So I went with her to register. I went, I took her over there for registering. So she went to register in the registrar's office and I went to the use the use the toilet and went downstairs and sitting in the in the small cafeteria. And I got a coffee and sitting there and waiting for her and, and in in few minutes, I see three security people pulling towards coming towards me. And they said, how are you? And I said, fine, can I see your ID? And I said what for? And they said, you know, just you want to see the ID. I said, I want to see what for? And they said, you know, there was a lady just like look like you were stolen there. Some of the student staff from the student Dome. So. So that is why you know I got to see your SO. I was not too happy. So finally I gave in. I showed my ID and I said I am a faculties wife in Juna Vista College and you are asking me, you are telling me that I stole something and you know I never stole steal anything and I never stolen anything. And I also want you to you to know my oldest daughter very graduated a year ago from here and she was the best student in the in the senior year and was given a a certificate, medal of certificate by the president of the university to her in as a whole university that she got the president award. You know, from the and then you are asking, you are telling me this. And we are sorry and we are sorry about that. And so I was not too happy. I did not accept their they are sorry or anything and I said OK and I waited for my daughter and she came and she was furious when I told her and I said I don't know even where you want to even come back to here. So anyway, we went home and I told my husband and we called the president and I told I called very first and she called the president. He was a Josuit Besuit priest and ** *** called him and he said I am so sorry it happened. It should have never happened like that. So, you know, then they sent me a letter of pardon, asking for pardon and they always ask for, you know, donations of every year and all that. But I was not too happy. And so, so that was the, that was another story that I encounter, racism I encounter." },
  "When did you first arrive to the Midwest?": { id: 59, category: "General", videoId: "NMXCPqqwwX4", transcript: "I arrived here in Chicago area in October or not in October of 19, 2009, 2001." },
  "please tell me about your journey to the Midwest.": { id: 60, category: "General", videoId: "VBI9137w0ug", transcript: "When we were living in from Boston, we moved to New Jersey again and in a different city closer to New York, because my, my husband was going to for his PhD in New York, Greenwich Village for his PhD in social work. And he, we were there for, for maybe about a year. And then then my husband, while he was in the Graduate School, he, he was looking for job markets and then he found a job in Iowa, Buena Vista College in sociology and social work. So he applied for that and for so the president of the university came to New York and he invited us to go there to have the interview with him. He wanted me to go with him also. So we both went there and had the interview. So he said we would like you to come to Storm Lake, IA and see the place before you take your job. It is a small place so we would appreciate if you can come and see the place before you take the job. So So we said it is OK, you know that we will do that. So we went to Storm Lake from from New Jersey in a in a in the plane to up to Chicago and from Chicago we travelled in the then overnight and trains trained. So the train was it took us a almost a a whole day, whole night. So and then when we got there, someone from the college came and picked picked us up and took us to the to their house. It was a nice family and we stayed with them and then we went for the interview at the college." },
  "When and why did you move to Iowa ?": { id: 61, category: "General", videoId: "nMTaXC97qKM", transcript: "Berry was born in Hackensack, NJ in October of 1963 and she was almost nine months. We moved to Storm Lake, IA to take the job for AG Thomas at Buena Vista College. So we moved there in 1964 of August and since then we lived there for 37 years." },
  "What is your citizenship story? When did you receive it?": { id: 62, category: "General", videoId: "gR2BCutHxP8", transcript: "I am a U.S. citizen and I became a U.S. citizen in 1978." },
  "What was your feeling about the US? Did you want to come? When you came? Did you intend to stay or to leave?": { id: 63, category: "General", videoId: "bT7vcv0fwjQ", transcript: "Yes, I was interested to come to US because I heard so much about United State and the life here. So I wanted to come. I was interested and I came in, you know, I came in 1961." },
  "How did you come to the US and why did you move to the different places you went?": { id: 64, category: "General", videoId: "7ZAtnOfapKM", transcript: "I came to the United States as a nurse in Newark, NJ, and I met my future husband in in three weeks. He came from Boston with a friend and he heard about that. Somebody told him that you know there is someone from his area here. So he came with his friend to see me. Then I was I did not know why he is came and I was surprised to see somebody because there were no Indians there and I was surprised to see and Nehave I was happy to see someone from India especially from Kerala. We speak the same language. Then he went back or they went back and he called me and talk. We called and talk to talk to each other and he said I was looking for and I am interested to marry and if you are willing and I said I have to ask my parents. He said I have to ask my parents too. So I said OK we will talk about this again. So he came, actually he came and visited me 2-3 times and I also went to Boston and visited him and then he got married in six months in Attleboro, MA. And then I moved from Newark, NJ to Boston where he was. He was going to Boston University for his graduate degree in sociology. So I moved to Boston in September of 1961. Then then we, I was, we were there for until 63, first January and then we moved to New Jersey in they are closer to New York in Hackensack, NJ. And that's where he went that from there, he went to for his PhD program in in Greenwich Village, New York. And while we were there and I became pregnant and I also went his part time to school, but I didn't continue because I became pregnant." },
  "What did you expect your life would be like in the US or in Iowa? Did the reality match your expectations?": { id: 65, category: "General", videoId: "kZrymdtWLjw", transcript: "I didn't I didn't know very much about United States life, life in United State, but I had some idea because we I have was trained in the hospital where the IT was started by American missionaries. So there were lot of foreign missionaries as well as the doctors there and they then we always where taught to use only for knife and spoon and fork to eat and speak in English even in our in our school in our rooms. So we were encouraged by that and we we did that. And so that helped me, you know, when I came to, came to United State. So their life, you know, it was pretty, it was easier for that to adapt, you know?" },
  "How are you treated by other Americans once you were in the US?": { id: 66, category: "General", videoId: "M7FLylC3u-Y", transcript: "At most part every everybody treated me when I was in in Newark, NJ. Of course, there were not any other students or in doctors or any new DOE everybody. It was all white people there. And when we moved to New Jersey second time, of course that time we had some discrimination in when I have been, we were looking for a bigger apartment because we needed that for for when Betty was going to be coming soon." },
  "Did you encounter any other instances of racism or discrimination?": { id: 67, category: "General", videoId: "L-6lnmVToeo", transcript: "I was pregnant, about 7-7 months pregnant. I of course were wearing a sari. That's my that's my dress for in India, Indian dress. I was wearing and and I saw and and I looking for an apartment and I saw an advertisement and I saw that I called them and made an appointment and she said, OK, come on, come on and see you could come right away. So I walked to the place. This was July and it was really hot, hot at that day or what day and I walked down there and got into their apartment and been I'm sorry of their their office and this the owner or the agent, she said, Oh, I'm sorry. I just we just, you know, rendered and that was a big blow on me. I was so sad to hear that. And so anyway, I walked back to my apartment and I called my husband. He was working on a part time job in the hospital nearby and he I called him and and I was crying and he said why are you crying? I said, you know, I went to the see the apartment and they said it is already rented. So I think that they did not like me or what it is, I do not know. It may be discrimination. So the guy who was working with him heard that and heard me crying. So he called somebody and I think he called the major mayor of that Siri and he actually found a better place for us to live to move. So, so that is how, you know, we found an apartment there. So it was not really too many times we experienced the the discrimination, but we did some." },
  "Describe your initial experiences upon arriving in the United States.": { id: 68, category: "General", videoId: "rIFtOPwDYn8", transcript: "When I came to New York and I was got out from the pier, it was almost 2:30 in the morning and when I got out it was cold. It was February and there was there was snow on the ground and I of course did not have a boots and had no jacket and not really heavy jacket. So that was kind of an experience. It was different than what I expected. But then I also then I went with this person who came to pick me up. He was sent by one of my relatives friend, you know. So he came to pick me up and took me to house one of his friend's house and I stayed overnight and they took me to the bus station the next morning and put me to go to, to the to the to go in the bus to New York, New Jersey. But when I got into the go to the bus station, I had to go through an escalator and I did not know what it is escalator like. So I was on the escalator with my huge suitcase with all my belongings and I it was so heavy and the escalator was full people, full of people and the people behind me. I always was going backward and the people behind me where very supportive and they put they support me and so I wouldn't fall fall backward. So that was a good experience and then I got into the bus and reached to the my designated place." },
  "How did you feel as you started the journey to the US?": { id: 69, category: "General", videoId: "zFC_2tUa_Rc", transcript: "I went to Newark, NJ and my Beth Israel hospital for and reported for reported to my Superintendent, nursing Superintendent and then she sent me to have lunch, lunch in the cafeteria with her assistant. So I went and had picking up some lunch, lunch, food, lunch on the cafeteria and there was cold carts and lunch meat and it was so cold when I start to sit down and eat. And it was, it was really different and was I was not able to eat. But the lady who took me, she said you could go and pick up something different. They said that's OK, I will, I will, I am OK, you know, that's all right. So that was a good experience." },
  "Where and how did you first find a place to live? Was it satisfactory?": { id: 70, category: "General", videoId: "zFC_2tUa_Rc", transcript: "When I came to the United State, I had a place to already. I had a place to live that was in the student nurses dorm. I had a room provided and with all the necessities and the food was provided in their cafeteria. So it was it was really a good place and I had no problem. I enjoyed that place. From there, the when we moved to to Iowa, we had a we had a apartment for a couple of days and and for a few days and then we look for a house and we rented a house and in after two years we bought a house in Storm Lake, IA and which was number problem. We had a a choice where we could where we want to live. We had a choice and we could buy the house anywhere in Storm Lake, IA.So there was number problem with that." },
  "What brought about subsequent moves?": { id: 71, category: "General", videoId: "HLA5ARLEGgI", transcript: "We moved to, we moved to Illinois because one of my, my one of my daughters, my oldest daughter were living in in Naperville, IL and we were, we were retired, of course, and we were older or two. And so we thought we will be wise to move to closer to one of our daughters.So that is the reason we, we were looking for a place. We came and looked for a place and find a found a smaller house with a new basement and, and all other things. You know that we needed it. We we, we bought that house and we moved to that house in 2001." },
  "What kind of help did you need in the early years here? Who helped you?": { id: 72, category: "General", videoId: "HjgrcUZdj4Y", transcript: "When I came to the United States in 1961 of February, it was cold and it was, of course, winter time and cold outside, and I needed to buy boots and jackets. So there were people in the Nurses Dome. They were senior students. They were willing to help me to go and to the store and buy, you know, help me to do that.And so they arranged, they called someone some of their friends and one lady came and took me. And so that was a great help. And she was a friend actually until I have so many years and then I go, I got in then not maybe lost our connection after so many years after I moving to Storm Lake, IA. And also the first thing I had the my some friends where I 2-3 days after I was at the with Israel Hospital and I worked worked for couple of days. And I was on the elevator with another lady. was little more older than me. And she started a conversation and asking me where, where I am from India. And I said yes. And she said, oh, I know a person. I know a family from India and she was pleased to talk about to me about how I she is so interested to continue, you know, interested to continue to have some, some close contact with me for after. So she came and she said and actually we exchanged telephone numbers and she called me and she came and pick me pick me up, you know, and took me to her house in to Montclair, which is about a little further away than from from New York. So she and her husband came and picked me and then had dinner with them and actually I stayed with them and then she brought me back to what we were to back to my nursing, nursing play, nursing dorm. And I actually enjoyed going with her to the hall, to church with her. And so we had a real connection for a while, for a long time. In fact, I got married in 1961, February, in December, in September, September. So she and her husband, they said your parents are not around here. So could could we could, could guy, you know, that was his name, could guy could walk you down to the aisle for on your wedding. And I said that's fine. So he walked me. He walked me down to the aisle on for my on my wedding and they were friends for a long long time. When we moved even to Iowa they came and visited me couple of times. So they were good friends and good connection with them and we we enjoyed their family as well." },
  "Did you encounter any instances of racism or discrimination, and how did you cope withthese challenges?": { id: 73, category: "General", videoId: "inngg5B8smA", transcript: "When when I was in the living in in Storm Lake, IA, my daughter Suma was as a transfer to her, she wanted to go to Creighton University for the two years to graduate and she had a scholarship from there, tennis and scholarship from there also. So she was at Creighton to register for the classes and I was there. So I went and used the upstairs ladies room and then and then I went and got a cup of coffee in the small cafeteria, students cafeteria. And I was sitting there three men, I think it was three security men approached me and I was little puzzled. What is what are they doing? And they I said, and they actually, he asked me how am I doing? I said fine. And he said, can I can we see your ID? And I said my ID what for? And I said they said or just check. I said check for what? I said, you know, I am a faculty wife from Storm Lake, IA. Storm Lake, you know, Buena Vista College, my husband is a faculty there and I am his wife and I am here to register my daughter for some classes. And they said, you know, yes, we understand that, but could we see your ID? And I said I have no idea why you want to see my ID. And they said, you know, finally they said, oh, we had a somebody look like you in the dormitory, took something from the students dorm and they are looking for that person. And I said, oh, OK, you saw somebody look like me. Ah, what what is that means? I am I am sitting here. If somebody took something, they would not be sitting here. And they said, please could we see your ID? And so finally I gave in and showed them the ID and they said sorry. And then they left. And I did not accept their sorry, but I, I waited for my daughter and she came and I when she came, I told her the what happened And she was really furious when she heard that. And then when she when we we went home to Storm Lake and I told my husband and we called Berry and told her she was in Minneapolis is their first year job. And she said, I just cannot believe I was the student student students award. You know, the all the all Unity Students award I had last year given by the president and they, and now they are saying that you are, you took something. So she called the President and you know, the president said, you know, she, he is very sorry and he was, he told them that you know that he is, he will be as he is. He is very, he is not very happy about it, but it happened, you know, and he is sorry about it. You know, he said, you know, please excuse, please forgive us. And then he said so." },
  "How did you navigate feelings of alienation or homesickness, and were there anysupport systems that helped you during difficult times? Were you expected tohelp out relatives back in India?": { id: 74, category: "General", videoId: "fVU9Uh54Y4U", transcript: "In, in when we were in New Jersey, when before Berry was born and we were going to a church and, and there, you know, one lady and we were, we had good friends there. And then one lady actually she initiated and did a baby shower for Berry. And so, and she was a work, she was a secretary at the UN and she was working at the secretary at the UN and she was very, very friendly with us. And we wondered, she wanted us to continue friends with us. And so she had, you know, you know, organized a baby shower and we, they brought so many things in for, for the baby. And she continued to, to be friends with us even after we moved from there. And then we, we had some friends who were, you know, that they, they gave us, you know, they brought us one of my, this lady who I knew, she actually, when Barry was born, she came, I am almost 3030 miles from her home to where we were living when, when he was born, she came most every day for a week. And she came and gave Barry a baby a bath. And then she brings some soup and, you know, light food for, for me. And that was very, very helpful. And I did not have anybody else, you know, of course, in this country at that time. And so that was a great thing. I always remember that. And she continued to be a friend." },
  "What challenges did you face in securing or maintaining suitable Housing?": { id: 75, category: "General", videoId: "1DRIJxWQuOo", transcript: "I came here as a as a nurse and I had a four years of my nurse's training and even though it was as equal to here at that time. So I would have liked to have some advanced education in nursing too. And I went for, went for, went to the college and took classes, but I did not have that time to finish it.But I enjoyed going to school.And of course, and then I became pregnant and I got sick.And so And then finally we moved to Iowa and I, I had four children there, but I, I took that when they were little more older. I went to the college and finished my degree in BS BS degree in social work. So that was Nachim and I feel." },
  "What impact did Indo-U.S. relations have on your life? Did they affect how you weretreated by other Americans?": { id: 76, category: "General", videoId: "YSZurBdMtsQ", transcript: "We had some open discussion, especially with my husband. You know he is, he loves to talk politics and he is, I enjoy talking to people about politics and he was enjoying it. And then they had a good time talking each other. There was number problem in talking about the relation between India and US." },
  "What challenges did you face in accessing Health care?": { id: 77, category: "General", videoId: "_6cCIpyg2uM", transcript: "Since we were married and we always had the insurance and we, we thought, you know, it will be safe that if you have insurance. So even though we did not have much money, but we always paid for the insurance. And then once we were in Iowa, you know, we had he had a job at the college and then they paid for I think part of it or I do not know for sure that they paid the whole insurance or we paid half of it. But we had the insurance. There was number problem with that. So we continued to pay for that and we had it until after we retired. So there was number problem with the insurance." },
  "what challenges do you face in social support, if if any?": { id: 78, category: "General", videoId: "Wg9mAraN_9g", transcript: "We did not have many challenges in and the social support we had wherever we were in New Jersey or in Iowa or in New York, where I was, it was people were willing most of the time or almost all of the time. People were very willing to help if we needed some help and also they were friendly. And so the community we done the the in New Jersey, we had the students and also some other families. They were pretty good friends. And then when we moved to Iowa, we made really good friends. They were the colleagues of my husband from college and they even invited them even I remember the first Berry was not a year old when we moved to Iowa to Storm Lake, IA. And we had we wanted to celebrate her birthday. And it is, you know, our Indian feeling. So I said, you know, I want to have a big birthday, you know, celebration for Barry. So my friend, you know who is from the college faculty, his wife, our good friend, she said, OK, why don't I have you come, you bring the child and then we will celebrate, you know, in our house. So she and I, she said I give you give me some of the names. So I gave her the names and I also called the people. We did not have time to go or to send an invitation or anything. So we had so many people from the college, we were there maybe about just a few months only by the time she had her birthday. So we had a quite a few people for her 1st birthday in their house and they were good friends and they were good friends until until they they were, they died, you know, just a few years ago. So where they were the best friends?" },
  "Can you tell us an instance of good social support you had?": { id: 79, category: "General", videoId: "DbHB8rgMIvQ", transcript: "In 1967, we went to my My husband and I went to India to see our parents. I never met his parents or he never met my parents and my parents were older. So what happened was, you know, we had some friends, they said, you know, go and see your parents. You know, we will take care of the babies. Do not worry about South. They are the Williams older girls and then also the Dollopsons older children, you know, like they were called college girls. They came and and stayed within our house and took care of these four girls. And it was really hard to think about it. But if I did not go that time, I would not have been able to see my parents and my mother. My father actually died in 1968. And my mother, yeah, my mother passed away in 69. So that was in a way that was a blessing that we could go and see them at that time and we and it was very appreciative that even though we worried about the children, but they took care of them very nicely and very carefully. So we were, we are thankful for that." },
  "So what challenges, if any, did you face with financial needs?": { id: 80, category: "General", videoId: "BmWq-PutlwM", transcript: "We were in in New Jersey. My husband worked part time and I, even though he was going to school for his PhD and I worked part time. I worked for some and then until I was not able to go for when I was because I was pregnant, but I did work and we saved some money S when we went to when we went to to Iowa, we had enough money for to buy a or buy to for a down payment for our for to buy a house. So it was not a big problem for we did not have to borrow, but we of course had to get money from the bank to the loan. The rest of it, you know, and we had to pay the rest of it in every month, you know that to pay off." },
  "So what aspects of Indian culture, traditions or lifestyle did you miss the most while living in the US?": { id: 81, category: "General", videoId: "sCURACGEGL8", transcript: "Here in special days like Christmas and Easter and we celebrate like that the same way we celebrate in in India, maybe in a different way. But we always gave much much as time and the time for time or importance in in Easter time and Christmas time because because it was very, very important times of the for for Christians. Those two times where so we celebrated in a different way though. But here mostly the Christmas were lot of Christmas trees and stuff like that. And that was not common in India at that time. When I was growing up, there were no Christmas trees or sand das or some things like that, but we had a Christmas. We had just the, the big the, the they had. We had instead of that we had celebrated in a different way and then we had a relative relatives come and also they we had good food cooked different foods and all that. So we had a great time we celebrating also. So we celebrated well and here it is more we are in traditional way and here it is more like commercialized way that did Christmas and all because you know the descender and the Bernie for Easter and all that kind of stuff as it more importance, you know." },
  "What challenges do you face in social support, if if any?": { id: 82, category: "General", videoId: "x6otKLLbWAU", transcript: "We were in New Jersey, we did not have any Indians. In Boston we had some graduate students going to different universities and because and I was married and living with my husband and they love to come and have some dinner. I cook even though I was not the perfect cook, but they love to come and have on weekends and I did cook for them and we enjoyed the company and my husband was always having the like, like to have the company also. So that was in Boston and then we moved back, you know, to New Jersey and also from there we did not have any Indians or other other nationals." },
  "How did you maintain a connection to your cultural roots, and did you participate in anycultural or religious activities?": { id: 83, category: "General", videoId: "eeysydL_Zcg", transcript: "In New Jersey, we didn't have any Indian community or other other people from other countries. And, and in Boston we had, we had students, graduate students from different universities, from different countries actually to they would love to come to my our apartment to have a meal. And my also my husband was very much also interested too. So he, we, he entertained them most very every most every weekends with the, with the, with those students. And they continued until they left Boston. From there they went to New Jersey and from back to, from then from there to to Iowa, Iowa. Then we never had any, any Indians or other nationals. They were the only outside of the community. So there was a one family of Pakistanis. They left us soon, six or six months after I think, you know, we went there and then we had after, after that, you know, So then, then maybe in the 70s we had some, you know, people from Vietnam, from Daos, Laos, from, from, from, not from China or, you know, people, you know, with the, the churches sponsored them and they were there. And we, we all, we always invited them for Christmas in our house. And I remember this particularly one family, they had seven children and they came to our house and in for the Christmas and we they enjoyed and we had a good time. And they were really, really, Yeah. We continued to have friends with them until we left. And then also the, we always, you know, enjoyed any other cultural, cultural thing like, you know, regular American, like 4th of July or 4th of July or any other important days. We celebrated with the, with the, with the, with everybody else, you know, like everybody else, we celebrated with them. And in the, in those days, those times too, So we enjoyed and there also the church churches too. We had a we celebrated with all their special days with the with the Christians there too." },
  "How did your perception of the \"American Dream\" evolve over time, and did it align withyour expectations?": { id: 84, category: "General", videoId: "XvgW5kEhw_U", transcript: "The best part was the I we had, I made some friends and they were lifetime friends. So that was a good thing. And then we also had, I met my future husband and you know, in a short period of time after I came and I, we got married. And then I have, I have a family which I really have a great time, you know, remembering them, you know, they are the best, you know, they are the the best thing happened to me in my life. And so, and they are, they have 4 girls who are who were born in one in New Jersey and three in Iowa. And they were educated well, well educated, independent and as beautiful women. And then they are are in different parts of America working and then they are enjoying their life too. And we are so proud of them and I was, I am so proud of them and I see them over." },
  "What advice would you give to future generations of immigrants pursuing theirown American Dream?": { id: 85, category: "General", videoId: "2jEJCf7zDUk", transcript: "Future generation, if anybody wants to come to America and they should have the attitude to work hard in the 1st place any kind of job, you cannot say that you know I am a doctor or I am AI am an engineer or I am I have a degree in this. And so lot of times those degrees are not honoured here in America. So you have to go for further advanced degree, advanced education in that field to get a job. And if you are a doctor, you have to take the, the, the, the license for that which you have to study hard. And so don't expect that when you come to America, because because coming to America is a good wish. But do not expect that everything is, is, you know, given to you and given, given, given to you freely. But you have to work very hard and you have to, you have to be willing to do that if you want to come to them. So work hard and get a good education and so hope and hope that you get a chance if you want to come to America." },
  "You know, did your initial idea of the American dream match what you experienced?": { id: 86, category: "General", videoId: "vPQ8MeJ2oVU", transcript: "My dream was, you know, I, when I came to the state to get advanced education and I, I got a degree in social work and I worked as a nurse and I, and I accomplished that and I feel that I accomplished that. And I got married, of course, and have a family and my husband also accomplished what he was hoping for. And, and my we got four daughters and they, we were, we were hoping to have a good education for them when they were born and we taught them your equation is very important. Even when they were small children and my husband was very particular to talk to them. That education is very important. And then also you are minority and you are girls, you are women. So that is 2 things you know that will be a dent for your hope. So only what you can do is try hard and get a good education so that you do not have to depend on anybody and you can get a good job and get a get a good job and then stand on your feet. And so so they accomplished that. Then they were very good about that. And then they all, I should say, complete each other or they are good students and they finished high school and college and then then they got good education and then they got good jobs in as, as I already mentioned that he is a teacher. And as I, as I mentioned, you know, Sheila and Suja and Suma, they all accomplished and, and people and they are, they had very good job and very good educational background. So they do not have to worry about in their life. So they are, they were, they are very proud of it. And I am so proud of them.I am so proud of them that you know, I, I can, I can die that I didn't. They are in good stand. Good, you know, good stand.A" }
};
const BIO_DATA = {
  mariamma: {
    details: {
      "Full Name": "Mariamma Thomas",
      "Birthplace": "Malakara, Kerala, India",
      "Year of Arrival": "1960",
      "Profession": "Registered Nurse",
      "City of Settlement": "Chicago, IL"
    },
    biography: [
      "Mariamma's journey to the Midwest began in the early 1960s, a time when very few South Asians lived in the region. Seeking professional opportunities, she joined a nursing program that placed her in the heart of Chicago.",
      "During her early years, she navigated significant cultural shifts, from adapting to the harsh Midwest winters to finding familiar ingredients for cooking. Her story highlights the resilience of the early wave of South Asian healthcare professionals who established roots before the 1965 Immigration Act.",
      "Over the decades, Mariamma became a pillar of her local community, helping establish cultural organizations and serving as a bridge for later immigrants arriving in the 1970s and 80s."
    ],
    gallery: [
      "https://via.placeholder.com/400x300?text=Mariamma+Photo+1",
      "https://via.placeholder.com/400x300?text=Mariamma+Photo+2",
      "https://via.placeholder.com/400x300?text=Mariamma+Photo+3"
    ]
  },
  ashraf: {
    details: {
      "Full Name": "Ashraf Samji Manji",
      "Birthplace": "Dar es Salaam, Tanzania",
      "Year of Arrival": "Mid-1960s",
      "Profession": "Demographer (for Chicago Public Schools), Urban Geographer, and Volunteer Producer/Director.",
      "City of Settlement": "Evanston, Illinois."
    },
    biography: [
      "Ashraf Samji Manji (1943–2026) was a distinguished urban geographer and demographer for Chicago Public Schools who dedicated his career to civic planning and equitable education access. Born in Dar es Salaam, Tanzania, he earned his doctorate from Northwestern University before becoming a pioneering advocate in Chicago's Asian American community. As a founding board member of the Asian American Institute, he championed racial equity and elevated Asian American voices in local leadership. Beyond his professional work, Manji was a passionate architectural preservationist, film producer, and storyteller who celebrated diverse cultural experiences. He passed away in Evanston, Illinois, leaving a profound legacy of community building and advocacy."
    ],
    gallery: [
      "https://via.placeholder.com/400x300?text=Ashraf+Photo+1",
      "https://via.placeholder.com/400x300?text=Ashraf+Photo+2",
      "https://via.placeholder.com/400x300?text=Ashraf+Photo+3"
    ]
  }
};
const IDLE_VIDEOS = { ashraf: "Ashraf_Still_0002_No_Audio.mp4", mariamma: "Mariamma_Still_0001_No_audio.mp4" };
const FALLBACK_VIDEOS = { 
  ashraf: [
    "BVJaMC5CY64"
    
  ], 
  mariamma: ["R1D2xzO6Yew"] 
};const getVideoUrl = (person, videoFile) => `/videos/${person}/${videoFile}`;

// --- SUB-COMPONENT: InterviewPage ---
const InterviewPage = ({ person, name, setCurrentPage, currentResponse, setCurrentResponse, question, setQuestion, handleAskQuestion, isThinking, chatHistory, videoRef, chatEndRef, suggestedTopics, currentCategory }) => {
  
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      playsinline: 1
    },
  };

  const bioInfo = BIO_DATA[person] || BIO_DATA.mariamma; // Fallback just in case

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
      
      {/* --- TOP SECTION: CHATBOT (Takes up exactly 1 screen height) --- */}
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px 40px 10px 40px', borderBottom: '1px solid #eee', flexShrink: 0 }}>
          <button 
            onClick={() => setCurrentPage('home')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '0.9rem' }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', margin: 0 }}>Interview {name}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', flex: 1, padding: '10px 40px 30px 40px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <div style={{ backgroundColor: '#000', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
              
              {currentResponse && currentResponse.videoId ? (
                <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                  <YouTube
                    videoId={currentResponse.videoId}
                    opts={youtubeOpts}
                    onEnd={() => setCurrentResponse(null)}
                    style={{ width: '100%', height: '100%' }}
                    iframeClassName="youtube-iframe-clean"
                  />
                  {/* Blocks hover/click events so YouTube controls never appear after load */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }} />
                  <style>{`
                    @keyframes fadeOutCover {
                      0%   { opacity: 1; }
                      20%  { opacity: 1; }
                      100% { opacity: 0; }
                    }
                  `}</style>
                  <div
                    key={currentResponse.videoId}
                    style={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                      backgroundColor: '#000',
                      zIndex: 11,
                      animation: 'fadeOutCover 0.4s ease-out forwards',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              ) : (
                <video
                  ref={videoRef}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  controls={!!currentResponse}
                  autoPlay
                  muted={!currentResponse}
                  loop={!currentResponse}
                  onEnded={() => setCurrentResponse(null)}
                >
                  <source src={currentResponse ? getVideoUrl(person, currentResponse.videoFile) : getVideoUrl(person, IDLE_VIDEOS[person])} type="video/mp4" />
                </video>
              )}

              {!currentResponse && (
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '8px 16px', borderRadius: '4px', fontSize: '0.9rem' }}>
                  Ready for your question...
                </div>
              )}
            </div>
            
            {/* Scroll Indicator */}
            <div style={{ textAlign: 'center', marginTop: '15px', color: '#6b7280', fontSize: '0.9rem' }}>
              ↓ Scroll down for biography and gallery ↓
            </div>
          </div>
          
          <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '16px', border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', height: '90%', overflow: 'hidden' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700', flexShrink: 0 }}>Conversation Transcript</h2>
            
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
              {chatHistory.length === 0 ? (
                <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>Ask a question to start the conversation...</p>
              ) : (
                chatHistory.map((msg, index) => (
                  <div key={index} style={{ marginBottom: '15px', textAlign: msg.type === 'user' ? 'right' : 'left' }}>
                    <div style={{ display: 'inline-block', padding: '10px 15px', borderRadius: '12px', maxWidth: '85%', fontSize: '0.95rem', backgroundColor: msg.type === 'user' ? '#10b981' : '#fff', color: msg.type === 'user' ? 'white' : '#111827', border: msg.type === 'bot' ? '1px solid #e5e7eb' : 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>
            
            <div style={{ flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion(person)}
                  placeholder="Type your question..."
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #d1d5db', outline: 'none' }}
                  disabled={isThinking}
                />
                <button
                  onClick={() => handleAskQuestion(person)}
                  disabled={isThinking || !question.trim()}
                  style={{ padding: '0 20px', backgroundColor: isThinking ? '#9ca3af' : '#10b981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
                >
                  {isThinking ? "..." : <Send size={20} />}
                </button>
              </div>

              <p style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', color: '#374151' }}>
                {currentCategory ? `Topics related to ${currentCategory}:` : 'Suggested Topics:'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px', overflowX: 'auto', paddingBottom: '10px' }}>
                {suggestedTopics.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleAskQuestion(person, q)}
                    style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', color: '#2563eb', backgroundColor: '#eff6ff', padding: '6px 12px', borderRadius: '20px', border: '1px solid #dbeafe', cursor: 'pointer' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: BIO & GALLERY (Scrollable) --- */}
      <div style={{ backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', marginBottom: '80px', alignItems: 'start' }}>
            
            {/* Bio Details Sidebar */}
            <div style={{ backgroundColor: '#f9fafb', padding: '30px', borderRadius: '16px', border: '1px solid #f3f4f6' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '20px' }}>Quick Facts</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {Object.entries(bioInfo.details).map(([key, value]) => (
                  <li key={key} style={{ paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                    <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.05em', marginBottom: '4px' }}>{key}</strong>
                    <span style={{ fontSize: '1.1rem', color: '#1f2937', fontWeight: '500' }}>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Biography Text */}
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', margin: '0 0 30px 0' }}>About {name}</h2>
              {bioInfo.biography.map((paragraph, index) => (
                <p key={index} style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4b5563', marginBottom: '20px' }}>
                  {paragraph}
                </p>
              ))}
            </div>

          </div>

          {/* Photo Gallery */}
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '30px' }}>Historical Gallery</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {bioInfo.gallery.map((imgSrc, index) => (
                <div key={index} style={{ aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
                  <img 
                    src={imgSrc} 
                    alt={`${name} historic photo ${index + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

// --- MAIN COMPONENT: App ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [question, setQuestion] = useState('');
  const [currentResponse, setCurrentResponse] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  
  const videoRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => console.log("Auto-play prevented:", error));
    }
  }, [currentResponse, currentPage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleAskQuestion = (person, directQuestion = null) => {
    const qToAsk = directQuestion || question;
    if (!qToAsk.trim()) return;

    setIsThinking(true);
    setChatHistory(prev => [...prev, { type: 'user', text: qToAsk }]);
    
    setTimeout(() => {
      const questions = person === 'ashraf' ? ASHRAF_QUESTIONS : MARIAMMA_QUESTIONS;
      const matchedKey = findBestMatch(qToAsk, Object.keys(questions));
      
      if (matchedKey && questions[matchedKey]) {
        const matchedData = questions[matchedKey];
        setCurrentResponse({ ...matchedData, person });
        setChatHistory(prev => [...prev, { type: 'bot', text: matchedData.transcript }]);
        setCurrentCategory(matchedData.category);
      } else {
  const fallbackVideos = FALLBACK_VIDEOS[person];
  const randomFallback = fallbackVideos.length > 0 
    ? fallbackVideos[Math.floor(Math.random() * fallbackVideos.length)]
    : IDLE_VIDEOS[person];
  
  // 1. Set distinct fallback text for each interviewee
  const fallbackText = person === 'mariamma'
    ? "I don't have an answer to that. Ask me another question." // Mariamma's specific text
    : "Can you ask me something else?"; // Ashraf's default text

  // 2. Detect if the video is a YouTube ID (no extension) or a local file (contains a dot, like .mp4)
  const isYouTubeId = !randomFallback.includes('.');

  setCurrentResponse({ 
    question: "I don't have a direct answer.", 
    id: null, 
    videoId: isYouTubeId ? randomFallback : undefined, 
    videoFile: !isYouTubeId ? randomFallback : undefined, 
    person, 
    isFallback: true 
  });
  
  setChatHistory(prev => [...prev, { type: 'bot', text: fallbackText }]);
}
      setIsThinking(false);
      setQuestion('');
    }, 1000);
  };

  const findBestMatch = (userQuestion, availableQuestions) => {
    const normalizedUserQ = userQuestion.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;
    
    availableQuestions.forEach(q => {
      const qLower = q.toLowerCase();
      const userWords = normalizedUserQ.split(/\s+/).filter(w => w.length > 3);
      const matchedWords = userWords.filter(word => qLower.includes(word));
      const score = matchedWords.length / userWords.length;
      if (score > bestScore && score > 0.25) {
        bestScore = score;
        bestMatch = q;
      }
    });
    return bestMatch || availableQuestions.find(q => q.toLowerCase() === normalizedUserQ);
  };

  const getSuggestedTopics = () => {
    const questions = currentPage === 'ashraf' ? ASHRAF_QUESTIONS : MARIAMMA_QUESTIONS;
    const allQuestions = Object.keys(questions);
    
    if (!currentCategory) {
      return allQuestions.slice(0, 5);
    }

    const sameCategory = allQuestions.filter(q => questions[q].category === currentCategory);
    const otherCategories = allQuestions.filter(q => questions[q].category !== currentCategory);
    
    return [...sameCategory, ...otherCategories].slice(0, 5);
  };

  if (currentPage === 'ashraf' || currentPage === 'mariamma') {
    return (
      <InterviewPage 
        person={currentPage}
        name={currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
        setCurrentPage={(page) => { 
          setCurrentPage(page); 
          setChatHistory([]); 
          setQuestion(''); 
          setCurrentResponse(null); 
          setCurrentCategory(null);
        }}
        currentResponse={currentResponse}
        setCurrentResponse={setCurrentResponse}
        question={question}
        setQuestion={setQuestion}
        handleAskQuestion={handleAskQuestion}
        isThinking={isThinking}
        chatHistory={chatHistory}
        videoRef={videoRef}
        chatEndRef={chatEndRef}
        suggestedTopics={getSuggestedTopics()}
        currentCategory={currentCategory}
      />
    );
  }

  return (
    <div style={{ 
      backgroundColor: '#111', 
      minHeight: '100vh', 
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      color: 'white', 
      fontFamily: 'sans-serif', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #eee', padding: '24px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#000' }}>SAAPRI</div>
          <div style={{ height: '32px', width: '1px', backgroundColor: '#d1d5db' }}></div>
          <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>South Asian American Policy & Research Institute</div>
        </div>
      </header>
      <div style={{ flex: 1, padding: '60px 0', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div style={{ borderTop: '4px solid #22c55e', paddingTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '24px' }}>Life in the Midwest Before 1965: Ask a South Asian Immigrant</h1>
            
            <div style={{ maxWidth: '850px', lineHeight: '1.6', color: '#d1d5db', marginBottom: '32px' }}>
              <p style={{ marginBottom: '20px' }}>
                The journey of South Asians who came to Illinois between 1945 and 1965 remains one of the great untold stories of American immigration. In late 2005, SAAPRI began collecting the oral histories of South Asians who came to Illinois between 1945 and 1965. This was the first attempt by any group to document the history of South Asian immigration to Illinois in the pre-civil rights era and explore how they were affected by issues of race, caste and homeland politics.
              </p>
              <p>
                The project attempted to understand the challenges faced by a generation of South Asian immigrants, both in the immediate context of their arrival in Illinois and the broader context of world history. It examined the circumstances of their migration, their patterns of settlement, the facilitating agents and supporting institutions, and the structural and cultural barriers to advancement. The project brought together a pioneering group of immigrants whose voices might have been lost to history if not for this effort.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '24px', marginTop: '24px', justifyContent: 'center' }}>
              <button onClick={() => setCurrentPage('mariamma')} style={{ padding: '16px 32px', border: '2px solid #22c55e', color: 'white', background: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Interview Mariamma</button>
              <button onClick={() => setCurrentPage('ashraf')} style={{ padding: '16px 32px', border: '2px solid #22c55e', color: 'white', background: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>Interview Ashraf</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;