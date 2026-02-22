import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';

// --- Configuration ---
// You will need to replace this with your actual Google Drive API Key
const GOOGLE_DRIVE_API_KEY = "AIzaSyC_e0EbYfuNCoT63PbplSirW9PmLtzrBBM";

// --- Data Structures with Categories Integrated ---
const ASHRAF_QUESTIONS = {
  "What is your name?": { 
    id: 1, 
    category: "Demographics", 
    videoId: "1gYgN2hv-LPDVQWhi426leGXc-C-0trvg",
    transcript: "My name is Ashraf Manji." 
  },
  "Who is in your family?": { 
    id: 2, 
    category: "Demographics", 
    videoId: "1Q37Pix4R20R0B9J8kmm8uoBieBbMT7P1", 
    transcript: "Oh, many people. I have so many people in my family. I've had six sisters and three brothers." 
  },
  "Do you have a spouse or life partner? Are you married or have you been married?": { 
    id: 3, 
    category: "Demographics", 
    videoId: "1ah1F1tNFMWDDXuDY9bE1pRBZKfLLlnav", 
    transcript: "I I do have a spouse.\nMy spouse's name is… Sophia Lee." 
  },
  "Where do you live?": { 
    id: 5, 
    category: "Demographics", 
    videoId: "1mvwXDWN4ze99aF64AWYkpVTJk9iOvGF4", 
    transcript: "I live in Evanston, Illinois." 
  },
  "What do (or did) you do for a living? What job or career did you spend the majority of your life working at?": { 
    id: 6, 
    category: "Career", 
    videoId: "1Wh3enwn1ZZbYihLN3QH_1_723oPbdgT9", 
    transcript: "I'm retired now, but when I worked, I worked for the Chicago Public Schools in their school planning department." 
  },
  "What do you enjoy doing?": { 
    id: 7, 
    category: "Basics", 
    videoId: "1NkKK0UypLdY1G0cELUWwiCFYY0RUhv6K", 
    transcript: "[I enjoy] sleeping, mostly.\nI enjoy reading, I enjoy music… that's about it." 
  },
"Are you religious? If so, what is your religion?": { 
    id: 8, 
    category: "Demographics", 
    videoId: "1DERDELtTcNffZNeT5ZgPf05oBSjR7LS2", 
    transcript: "I am not religious, no." 
  },
  "What is your gender identity? What are your pronouns?": { 
    id: 9, 
    category: "Demographics", 
    videoId: "1PcBjgh12s1nFAOpidDIVQOxs5WGB4KoC", 
    transcript: "I am a straight male." 
  },
  "What is your native language? What languages do you speak?": { 
    id: 10, 
    category: "Demographics", 
    videoId: "18CdnqOu8mqOjKqMSixVDlsyZ53jXO5V1", 
    transcript: "My native language is Gujarati, actually a dialect of Gujarati which is Kathiawari. But I also speak English and... I understand Hindi, although I cannot speak it very well. And in school I've learned French and German." 
  },
  "What level of education have you completed?": { 
    id: 11, 
    category: "Education", 
    videoId: "1jn1wbAKAsCPr5UXjrGPMwSMvIMx0E50R", 
    transcript: "I have completed my Bachelor's and Master's degrees as well as a PhD." 
  },
  "When did you first arrive to the U.S.?": { 
    id: 12, 
    category: "History", 
    videoId: "16CZOeEoYOZkqz9M3HhZZwRYRdpyvuY9N", 
    transcript: "I came to the United States in August of 1963." 
  },
  "Where did you land first in the U.S.? Where did you first arrive in the U.S.?": { 
    id: 13, 
    category: "History", 
    videoId: "1PtnyGAZKQiQDIg_uw8iJBvZo70jpplGq", 
    transcript: "Well, I arrived in New York, which was the main port of entry, but then I proceeded to go to Pennsylvania where… I had a scholarship to attend a college called Bucknell University." 
  },
  "When did you first arrive to the Midwest?": { 
    id: 14, 
    category: "History", 
    videoId: "11WoDmpnopJZ28v9TslAZPsGFRBYQzN2e", 
    transcript: "I arrived in [the] Midwest... in 1967 after I graduated from Bucknell [University]. I came up here in Illinois to... go to Northwestern University [for graduate school]." 
  },
  "What did you pursue in Northwestern University? What degree did you earn there?": { 
    id: 15, 
    category: "Education", 
    videoId: "1vq0l5CCz5VeS57KguKeH6kDI1W85M5kN", 
    transcript: "At Northwestern [University] I got the Masters and PhD and that was in Urban Geography and Urban Planning." 
  },
  "What is your citizenship status? When did you become a U.S. citizen?": { 
    id: 16, 
    category: "History", 
    videoId: "1Ywl_l6KM60E3oKUfscUE-su3ZRH_FWlA", 
    transcript: "I'm a citizen of [the] United States and have been since about... 1975." 
  },
  "How did you feel about initially coming to the U.S.?": { 
    id: 17, 
    category: "Arrival", 
    videoId: "1asmBiWDiFUlFdM1uGUuKmt9xCGsW5oUn", 
    transcript: "Oh, I had a very high opinion of [the] United States... To me it was the greatest country in the world, particularly with respect to education. I heard and read so much about the universities in [the] United States. All the technological advances that were happening... anywhere were really happening in the United States. So there was much to admire about [the U.S.]. In addition to that, of course, [I admired] the values for which the United States stood [for]: the freedom, freedom of speech, freedom of religion, things like that. So I was very, very impressed with [the] United States." 
  },
  "Did you intend to stay or leave the U.S. after receiving your education here?": { 
    id: 18, 
    category: "History", 
    videoId: "1pyL_WR54Yds_JjWZ_nu8cKmHamAyGvhm", 
    transcript: "Once I came here, I did not really intend to stay here. The idea was that I would get [a] college education over here and then go back to Tanzania and work over there." 
  },
  "Can you share a bit about your life before you decided to immigrate to the United States?": { 
    id: 19, 
    category: "Early Life", 
    videoId: "1-4n6LmUmyh2qWsF-3GWQ7eKFTVhEaBCS", 
    transcript: "As you might imagine, my life in Tanzania was very different from the kind of life over here. First of all, while I was growing up, Tanzania was not an independent country. It was a British colony called Tanganyika and the makeup of the country was such that there were British expatriates who governed the country and were in charge of all major institutions like banking and so on. Then there were Indians who had emigrated there from India and they were like the middle class of the country. And then there were the native Africans who comprise[d] the largest... part of the population. Now I grew up as part of the Indian middle class. I went to an Indian public school where I learned... courses in Gujarati and some in Hindi and stayed mostly in... in the community. There was very little interaction between Indians in the middle [class] with European or or the British at the top and then the native Africans at the bottom. In terms of everyday living, my father owned a small store and we were all expected to help in the store. In a way that life was primitive but good. There were no such things as washing machines and dishwasher[s] and... all those kinds of things that make life comfortable over here, but it was nevertheless a a very pleasant way of living. I, I went to an Indian school and then completed... grade 12, which was K through 12, and then came over here to go to college, came to the US." 
  },
  "What factors influenced your decision to leave [Tanzania] and move to the U.S.?": { 
    id: 20, 
    category: "Early Life", 
    videoId: "1tBIAxy-VbFxu6QUbIIU-6TTG1DTqvLbV", 
    transcript: "As I graduated from high school, unlike a lot of the other students who were graduating with me, I wanted to go on for further education. Most of the other students generally got conscripted to work in their parent's stores..." 
  },
  "What did you expect your life would be like in the United States?": { 
    id: 21, 
    category: "Arrival", 
    videoId: "11c2-n1P0ywCuhjl0i636lwMet0xW61Co", 
    transcript: "I don't know that I was actually thinking about what my life would be like in the U.S. Mostly, I was just very excited about going to college. [I was excited for] the type of education that one can get in the U.S..." 
  },
  "How were you treated by Americans when you first moved to the U.S.?": { 
    id: 22, 
    category: "Arrival", 
    videoId: "12kl-JP_51OKybzwqvM9vUFL4ajNwMoIw", 
    transcript: "Most of all, I was very, very excited about coming here to the U.S. However, the program that I came on the, the, the, the... the program people realized that I was coming from a very different background..." 
  },
  "What was a memorable experience from your early days in the United States?": { 
    id: 23, 
    category: "Arrival", 
    videoId: "1I3lbZLizWzJ0q6_MZRK-sGrjKKK2Rg9t", 
    transcript: "If I can add one more or [a] couple more things about the family that I stayed with [when I first arrived in the U.S., right before I started university]. They were Quakers, which I knew nothing about..." 
  },
  "Describe your initial experiences upon arriving in the United States. Describe your experiences with activism in the United States. Did you engage with the Civil Rights Movement, how so?": { 
    id: 24, 
    category: "Activism", 
    videoId: "13xWHZ8-rWciNtQ535MQkcoUHJ9H-C5YN", 
    transcript: "Having attended the March on Washington, [it] had been a big impact on my life. I came to understand the importance of activism, to do [the] right [thing and] that the wrongs exist in our society..." 
  },
  "Did attending the March on Washington in 1963 have a lasting effect on your life? What was the racial climate like when you came to the U.S. in 1963?": { 
    id: 25, 
    category: "Activism", 
    videoId: "1crleQjCN-ZH1v5m3Pk6Wk6jl8GrplTvP", 
    transcript: "Yes, [attending the March on Washington in 1963] did [have a lasting effect on me]. First of all, I realized... how bad the racial situation was in this country, that they had to organize something major like this." 
  },
  "What aspects of American culture did find challenging or interesting ? How was your experience at college?": { 
    id: 26, 
    category: "Social Life", 
    videoId: "1DHGrUKJinPtExwP4fzCk-EVrxQxXd6LP", 
    transcript: "Initially, I was... at the university, so it was kind of like living in a bubble. The makeup of the university at the time, this university that I attended, but near the university was only about 2000 big..." 
  },
  "What was it like to date in college in the 1960s?": { 
    id: 27, 
    category: "Social Life", 
    videoId: "1UB5M1rEEyFjzyrX8YIneCsm_GKEQW4sG", 
    transcript: "I had made quite a few friends of both sexes and so on. So I started dating and while in some ways I was still not entirely socially adept - being a foreign student had that certain appeal..." 
  },
  "What is a story you can tell us about someone you dated in college?": { 
    id: 28, 
    category: "Social Life", 
    videoId: "10gL4U_xPpnX24jit-cRkeidRbUnQ6Urn", 
    transcript: "Yeah, yeah, the person - we used to call the girls at the time 'coeds' - her name was Barbara Crockett, but with a name like that, she had always beginning [as a] kindergartner, so [since then] she had always been known as Davey Crockett..." 
  },
  "How has your experience been living in Illinois with your experience living in other parts of the US?": { 
    id: 29, 
    category: "History", 
    videoId: "1z2KfUE4hskFLgF4F0D5VwWqTxrdAEAre", 
    transcript: "In the United States, I have basically lived in two states for the most part. I have traveled somewhat to other areas, but in terms of living, I've only really lived in Pennsylvania for four years or so..." 
  },
  "Were there any differences or things you particularly enjoyed about living in the U.S. compared to your previous life in Tanzania?": { 
    id: 30, 
    category: "Social Life", 
    videoId: "1CzSBWZX3raA2MvsvfzU4CN8WuOd0FnrW", 
    transcript: "I think the the dating life, particularly since I came here as a student and have been a student or had been a student for, for a long time, both in, both at Bucknell and at Northwestern, the, the, the social life was quite intriguing..." 
  },
  "How did you come to study in the U.S.? What were personal or global factors that allowed you the opportunity to come study in the U.S.?": { 
    id: 32, 
    category: "History", 
    videoId: "1gs71ao1hVY7s1dJKxuM3LvFp23r3rcGG", 
    transcript: "I had applied for scholarships to universities in [the] United States and I was accepted at one university, Bucknell University. The scholarship that I received was a program, was under a program called African Scholarship Program of American Universities, ASPAU for short..." 
  },
  "Are there any aspects of Indian culture or East African culture, traditions and lifestyle that you missed most coming to the U.S.? What kinds of food do you enjoy?": { 
    id: 33, 
    category: "Social Life", 
    videoId: "1ChtjPWwG_I7tyIIhNpGIYcfy1DLcq2Oj", 
    transcript: "Having come here [to the U.S.] at a relatively young age, I was 18 when I first came here and having lived here, the longest of any place I have lived, I do miss a lot of my heritage, and I I have lost at least some of it..." 
  },
  "How have you maintained connections with other South Asian or Asian immigrants and did you form relationships with people from different backgrounds?": { 
    id: 34, 
    category: "Social Life", 
    videoId: "1FL4-w615BAKmh1zEFBcjXxSkEzU4M3g_", 
    transcript: "Actually, when I first, when I first came here, there weren't that many South Asians or even Asians, so... and certainly while I was at Bucknell [University], you know, there, there were hardly any..." 
  },
  "What type of activism or leadership have you engaged in? Why did you co-found the Asian American Institute?": { 
    id: 35, 
    category: "Activism", 
    videoId: "1Pxvj2HU0xgdVp5cqa7mvbDfxpLER_ja_", 
    transcript: "In the United States, in general and the Midwest in particular, there are a number of Asian American organizations. Some of them are studying space and stuff and help new immigrants settle down..." 
  },
  "What was the hardest part of life in those early days of the institute?": { 
    id: 36, 
    category: "Activism", 
    videoId: "1G9ePlI6OH5TIJXxf9lRIFAC5ECUsBbFP", 
    transcript: "Yeah, when we first founded the institute, which was in the mid 1990s... we really did not have an identity as Asian Americans. You know, most people tended to identify themselves to Indians, Pakistanis, Chinese, Japanese..." 
  },
  "What advice would you give to future generations of immigrants pursuing their own American Dream?": { 
    id: 37, 
    category: "General", 
    videoId: "1BMuh33RYTnmm7uAMk92pMGuQZcI8DEHY", 
    transcript: "Before I came here and when I first came here in the early [1960s], while the racial situation was pretty bad in the country, technologically and perhaps in many other ways, the United States was the best country which you could be in..." 
  },
  "What challenges did you face in education?": { 
    id: 38, 
    category: "Education", 
    videoId: "1cdH5bFME_K92lxgGxiig9XFEM-FbB82q", 
    transcript: "There there were no real challenges in the pursuit of education. Initially, when I first came here, obviously my English was not very good,... so that was difficult." 
  },
  "What challenges did you face in securing or maintaining suitable housing in the U.S.?": { 
    id: 39, 
    category: "History", 
    videoId: "1DKAQfZVrHEJz1vM2VU6eTbG3D7L7ufSv", 
    transcript: "When I first came here to go to college [at Bucknell University], I had to live in the dorm because [it was] pretty much required so housing, that was not an issue. When I came to Evanston to go to Northwestern [University], there was a shortage of graduate-level housing..." 
  },
  "What challenges did you face in securing or maintaining suitable Housing?": { 
    id: 40, 
    category: "History", 
    videoId: "1cqR_NsEC9QE8W7zzNn3YQ_25zBT4zyih", 
    transcript: "So after I started working I saved some money, but the the culture in my community and in others is that you don't really rent places. So the sooner you can buy your own house and can free it up the better..." 
  },
  "What challenges did you face in accessing Health care?": { 
    id: 41, 
    category: "General", 
    videoId: "1i_h2zrfBoJsckBAzV4vvBqsSm1ciEySn", 
    transcript: "Healthcare again, for me healthcare was not really a problem that I know that it is for many people. While I was in college, of course, the university provided all the healthcare we needed." 
  },
  "What challenges did you face in social support?": { 
    id: 42, 
    category: "General", 
    videoId: "11CE9rzxVrt-FGaktX0P1ZXF5-sPyft2F", 
    transcript: "Social support also has not been... a big issue or a challenge for me. While working, of course, some of my social connections we had with respect to the people that I worked with, my colleagues there." 
  },
  "What challenges did you face with Financial needs?": { 
    id: 43, 
    category: "General", 
    videoId: "1qGLI2Lm9_1f6Bn2qpCpWbVB4Xu437pYF", 
    transcript: "There, in terms of financial needs, also, I have been strangely lucky. I had a good education, I have worked hard, I have lived a relatively frugal, simple life. So money has not been a particularly big issue for me." 
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
    transcript: "I I came here on a scholarship program and the organizers of the program had realized that… me, along with other students who came here on the program, came from very different cultural backgrounds..." 
  },
  "What opportunities or achievements did you experience in the U.S. that you might not have had in Tanzania?": { 
    id: 60, 
    category: "History", 
    videoId: "19dqEZQeqGSx9K-s5e-L_21jbsXxDa74H", 
    transcript: "As we all know, America is the land of opportunity, and it's the land where anybody can do anything and get anywhere. So in that sense, I too have benefited. First of all, I got [an] education..." 
  },
  "So what kind of work did you engage in when you first arrived or when you first graduated?": { 
    id: 61, 
    category: "Career", 
    videoId: "1pYb6EUnknFprHuXAOhvlzqSaWfGFfp_d", 
    transcript: "After graduating, actually even before I finished my PhD, I happened to be hired by the Chicago Public Schools because they were looking for somebody to help them with the planning of the schools..." 
  },
  "Were you treated fairly in terms of salary or opportunities? Did you gain recognition for your work? Did you notice or experience discrimination in the workplace?": { 
    id: 62, 
    category: "Career", 
    videoId: "1jbIvU-LsxGQx_h_v7dUb2GtFHlCE30to", 
    transcript: "By the way of working for the public schools... and and having basically come from an academic environment and not having known any other types of... jobs, I came to realize how much race played in terms of the employees in the school system advancing..." 
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
    transcript: "In terms of my own experience, the main... instance of discrimination I have experienced has been with respect to the job where the Asian Americans were not being promoted as much as they should have been considering what they were contributing." 
  },
  "How did you cope with racism and discrimination professionally or otherwise?": { 
    id: 65, 
    category: "Activism", 
    videoId: "1rUtLzZyJ3AtIK4-J7bmWXAGYkvOiE2fE", 
    transcript: "The main discrimination I get, encountered has been with respect to the jobs... whether Asian Americans were not being appreciated the way they should have been, since [given] their level of education and for what they were contributing..." 
  },
  "How did the political or global relationship between the U.S. and India impact your life? How did it impact how you were treated by Americans in general?": { 
    id: 66, 
    category: "General", 
    videoId: "1P2DgIZZvKK9SnXQEkIuzbCwkhPiiRKdJ", 
    transcript: "The relationship between [the] U.S. and India has not really had a particular impact on me, although the relationship has been often [...] from time to time, I'm not that strongly identified with India..." 
  },
  "Do you participate in cultural or religious activities?": { 
    id: 67, 
    category: "Social Life", 
    videoId: "1jWUBH6Do-plwGpqfLAg_hsH0VSuROXZC", 
    transcript: "Yes, I'm not religious so I don't participate in many religious activities. We just had the month of Ramadan for example where a lot of Muslims fast and I did not fast..." 
  }
};

const MARIAMMA_QUESTIONS = {
  "What is your name?": {
    id: 1,
    category: "Demographics",
    videoId: "1gYgN2hv-LPDVQWhi426leGXc-C-0trvg",
    transcript: "My name is Mariama Thomas."
  },
  "Do you have any siblings?": {
    id: 2,
    category: "Demographics",
    videoId: "1Q37Pix4R20R0B9J8kmm8uoBieBbMT7P1", 
    transcript: "My I am one of the eight in my in my family and I was the 7th in line and they all were, they all passed away. They all there passed away in their 90s and I am the only one left in that in my family."
  },
  "Who is in your family?": {
    id: 3,
    category: "Demographics",
    videoId: "V1-0007_Mariamma 3 of 5_00191809.mov",
    transcript: "My husband AG Thomas and we have 4 grown up daughters. My oldest one's name is Berry and she is a math teacher in and teaching at the closer to the city. And my second one is Sheila. She is she is a assistant Dean at at Harvard University in Boston. And the third ones are twins and the one her name is one of them is Suja. Her she is a professor at And the other, the other one is she, her name is Suma. She was at as a cardiologist in an Cleveland Clinic in Cleveland, OH."
  },
  "What do you enjoy doing? What do you do for fun?": {
    id: 4,
    category: "Personal Interests",
    videoId: "V1-0009_Mariamma 3 of 5_00194163.mov",
    transcript: "I like to read, I enjoy reading and I enjoy baking and also I used to swim for a long time and I miss that because they don't have a pool here. And I, I go out for breakfast with friends and also we have friends from the pool, long time friends we go for for coffee and breakfast once a month and it I enjoy those outing and also, you know, being with friends and and I enjoy the family also. You know you will have. I love to be with my family also."
  },
  "Are you religious? If so, what is your religion?": {
    id: 5,
    category: "Demographics",
    videoId: "V1-0011_Mariamma 3 of 5_00196134.mov",
    transcript: "I am religious. I am, I am a Christian, and I belongs to [a church] here [near my senior living place]. I [attend] a Methodist Church, and I enjoy going there. Right now, I am unable to go in this winter time. I was not able to go and I could... They give a ride in the bus, they could take us in the bus, to the church. But in some time, I did not go. And in, in other times, like, you know, when we were in Iowa, we were.. we were going to Presbyterian Church. And my children were born here [in the U.S.] and baptized there. And they also grew up in that church for 17 - 18 years. And we all enjoyed the going to church, you know, and we have so many friends in the in the church as well as in the community."
  },
  "Where and when were you born?": {
    id: 6,
    category: "Demographics",
    videoId: "V1-0009_Mariamma_Full_Interview_Clipping00007042.mov",
    transcript: "I was born in in Malakara, India state of Kerala. My birth date is January 25, 1930. I am one of the eight in my, in my family, and I was the 7th in line. And... they all were, they all passed away. They all ... passed away in their 90s, and I am the only one left, in that, in my family."
  },
  "What is your native language ?": {
    id: 7,
    category: "Demographics",
    videoId: "V1-0013_Mariamma 3 of 5_00199350.mov",
    transcript: "My native language is Malayalam, and I speak also English. And I mostly speak English ... now and also to my children when they were - even when - they were babies, we talk to them in English."
  },
  "Do you have a spouse or a life partner?": {
    id: 8,
    category: "Demographics",
    videoId: "V1-0014_Mariamma_Full_Interview_Clipping00009581.mov",
    transcript: "I was, yes, I was married, but my spouse passed away in 2005. And his name is AG Thomas."
  },
  "What language did you speak with your children?": {
    id: 9,
    category: "Family Life",
    videoId: "V1-0015_Mariamma 3 of 5_00200447.mov",
    transcript: "We spoke, we talked to them or we spoke to them only in English, even when they were babies because... my husband especially was very concerned that when they go to school, they will get confused with English with ... our mother tongue... so that was one reason and I think the only and one reason... we talked, we talked to them in English. And they, even when they were older, they think that we should have talked to them in our mother tongue also."
  },
  "When did you come to USA ? When did you meet your husband?": {
    id: 10,
    category: "Arrival",
    videoId: "V1-0016_Mariamma_Full_Interview_Clipping00010105.mov",
    transcript: "I came here in United States in February 1961, and in three weeks [after that] he [my husband] came to see me from Boston with a friend. And that is how we met the first time."
  },
  "What is your education? What did you study?": {
    id: 11,
    category: "Early Life",
    videoId: "V1-0017_Mariamma 3 of 5_00202992.mov",
    transcript: "I went to Chengannur for my education, and I graduated from high school in Chengannur, India. And then I went to college for two years and wanted to be a teacher. But as... when I finished my two years of college, I didn't want to be a teacher. I said to my parents \"no, I don't want to be a teacher, I want to go for nursing.\" And they were not that keen about sending me to nursing school because... nursing was at that time was not a very respected profession, because the girls will be taking care of men - and that was a, a taboo you know, I should say. So anyway, my, one of my brothers said \"if she wants to go to the nursing, let her go,\" you know. So finally ... my parents said, OK, you know, \"you want to go to the nursing school? Go that is OK,\" you know. So they, they agreed to let me go to the nursing [school]."
  },
  "How did you meet your spouse? How did you meet your husband?": {
    id: 12,
    category: "Family Life",
    videoId: "V1-0018_Mariamma_Full_Interview_Clipping00010952.mov",
    transcript: "He came to know me through a friend [who] said that, you know, somebody from his state area and his home area is here. So he was interested to and looking for to get married - and was interested to see someone from Kerala. That's how he came to see me."
  },
  "What was your life like in India? How did you come to the United States?": {
    id: 13,
    category: "Early Life",
    videoId: "V1-0022_Mariamma 3 of 5_00209225.mov",
    transcript: "I grew up in in Kerala and and I had my [training]... I graduated and then I went for nursing. And once I went for nursing, then I had my, then I [found] a job in Assam that was quite far away. And I flew from Calcutta to, to Assam in a cargo plane because there was no airport there [in Assam]. So I flew in a cargo plane which I did not even know... there was a light there or any people there. I could not see anything. But I managed to stay, and I had a big, big suitcase there in, in there with me. So people, everybody, the relatives [who] came into the airport in Calcutta said, \"if you, if you get any in trouble, if you have any problem, just push the... push your suitcase down, and so you will be safe then. So anyway, I, I was in the cargo plane and landed in a, in a small road, where where this place, where I was going. nd I went there and then some people came and picked me up. And I went and stayed in a place, in a house there they provided me, and I was there for maybe a year. And so I was, I was OK there. And then I moved to a different place which was bigger than that. And then it was a British oil company and they had a hospital there. And then it was there - also was tea production, also there. So, you know, I had ... two of three of my other friends came from Vellore and stayed with me for another two more years, and then I found this job in the United States, to come [to the U.S.]."
  },
  "Where do you live currently? Where do you live now?": {
    id: 14,
    category: "Demographics",
    videoId: "V1-0022_Mariamma_Full_Interview_Clipping00013300.mov",
    transcript: "I live in the suburb[s] of Chicago: Naperville. That's where I am. I live in [Naperville]."
  },
  "Do you have siblings? Who did you grow up with? What did you do when you were young?": {
    id: 15,
    category: "Early Life",
    videoId: "V1-0024_Mariamma 3 of 5_00213663.mov",
    transcript: "I was 1 of 8 children, and I was the 7th one. And I had a younger brother, and I always took care of him, and he was five years younger than me. And all my sisters and brothers got married, and they were or somewhere... they were working some place, you know, in outside of Kerala. And my sisters all got married, and they have family. And they, I told my when I graduated from high school and ... from from college, my parents wanted me to get marry. I said [to my parents], \"I do not want to get marry, you have grandchildren and so enjoy the grandchildren. I do not want to get marry, but I want to go for nursing [education].\" So they were not happy [about that], but because my brother said, you know, \"it is OK to go,\" so they were happy to send me. So that is what happened, you know... that I found, found... and I went to Vellore and I had my nurse's training."
  },
  "What did you do for a living or what job or career did you spend the majority of your life working in?": {
    id: 16,
    category: "Career",
    videoId: "V1-0025_Mariamma_Full_Interview_Clipping00013801.mov",
    transcript: "I am a registered nurse and I worked all my life as a nurse as a registered nurse."
  },
  "How would you compare your experience in Iowa with living in the other parts of the US?": {
    id: 17,
    category: "History",
    videoId: "V1-0026_Mariamma 3 of 5_00216633.mov",
    transcript: "We lived in Iowa for 37 years. My husband was a professor at the at Buena Vista College and my children, three of my children were born and brought up there. And Berry was born in Newer and Hackensack, NJ, but we moved to when she was nine months old. She we moved to Iowa for my husband to take the job and I work there too. But when we were when the kids were growing up, I did not work. And when they were maybe 5-6 years old and they were in school, I went to for some part time work, but the place was there was number. We were the only outside of the white community living there. We were the only colored people you should say could say living there. And most of the people where cordial and also nice to us and to the family and respected us. And of course, you know, there were some were not that, you know, jealous and because we were educated and also so because of that, you know, there was some problem with the discrimination and ratio differences. My kids were in high school and they were, they were playing good, good tennis players. So they went to play tennis on college campus court, college tennis court. And they were playing and these football players, they come early and then they practice there. But when they saw my children playing there, they, they said you, you someday they called some names and they said go home. And they were, they were very insulted. So they came home crying and they were in high school kids, you know, they, they came home crying. And my husband and I called the president of the university and he was he said I am sorry and I will take care of it. He said he send he send a note to the football players, said you all sign your names and tell them that you are sorry or excuse them. So they, they said, if you don't do it, you know, I will take action, he said. So they all signed their names and sent to us the, the, they signed the paper. So that was one instant. Then they were in high school. Some of the girls, you know, my kids were very good students and also well behaved girls. So the teachers really like them very much.And they were good sportsmen too.So they maybe they were some of them were jealous and they said, they said they, they wrote actually some notes and then put it in their lockers, you know, calling some names, you know, and that was take action taken by the teachers when they found and then they were shopping for a birthday present for their friends in a department store. My girls, all three of the three of them were shopping and then they finished shopping and they bought some gifts and were coming back to their car.And then this girl, the clerk or the the the girl who will take took care of them or the people under in the counter, She said those girls here, they stole something.So the manager told the manager, the manager came running and took the pairs from the Berry. My daughter and he searched the purse and he did not find anything except the gift that they bought. So he they were, they were really surprised what he was doing and they were not very happy about it. So he left and then they said we do not want his and this. So they returned that. They went back to the store and returned that and they came back came home crying. See this guy did that to us. You know, we never, never steal something, never stole anything, never life. And they and so they came home and crying. So what we did was we I, my husband was not there and I called my husband and I called a neighbor who was a lawyer, who was the critic owner from us and he was a lawyer. He was a very good neighbors.They were very good neighbors. And he said the I know these children since they were small babies, they know how what they are. So I am going to call them call him and ask what I can take care of it. So he called him and said, I hear that this Thomas girls came and he used search their purse and see and they they since they were babies, I know them. I know each one of them. So you better send a pardon and to them writing all of their names and ask them pardon. If not, I will see you in court. So he actually sent, called us and said, you know, he fell, he felt bad, he was sorry, he didn't mean to do that and all that.So that was that."
  },
  "So tell me about life in India and then also how did you come to the US?": {
    id: 18,
    category: "Early Life",
    videoId: "V1-0027_Mariamma_Full_Interview_Clipping00014311.mov",
    transcript: "In India, you know, I had my nurses training in Vellore, one of the best hospital, medical medical school as well as the nursing school at that time. And I had my nurses training there for four years and then I stayed and worked there for two years. Then I also moved to Assam. I took a job in Assam in an oil company hospital. That's where I spent the time before I came into the United States."
  },
  "Did you encounter any instances of racism or discrimination? And how did you cope with these challenges? So tell me about some of your own personal experiences.": {
    id: 19,
    category: "Activism",
    videoId: "V1-0028_Mariamma 3 of 5_00228719.mov",
    transcript: "My one of my twins, Suma, was at Northwestern in Evanston as a student and her third they all my girls went to Evanston for for undergrad. On her third year, she said, you know she wants to move to Creighton University in Omaha. So she transferred to Creighton University in on her third year. So I went with her to register. I went, I took her over there for registering. So she went to register in the registrar's office and I went to the use the use the toilet and went downstairs and sitting in the in the small cafeteria. And I got a coffee and sitting there and waiting for her and, and in in few minutes, I see three security people pulling towards coming towards me. And they said, how are you? And I said, fine, can I see your ID? And I said what for? And they said, you know, just you want to see the ID. I said, I want to see what for? And they said, you know, there was a lady just like look like you were stolen there. Some of the student staff from the student Dome. So. So that is why you know I got to see your SO. I was not too happy. So finally I gave in. I showed my ID and I said I am a faculties wife in Juna Vista College and you are asking me, you are telling me that I stole something and you know I never stole steal anything and I never stolen anything. And I also want you to you to know my oldest daughter very graduated a year ago from here and she was the best student in the in the senior year and was given a a certificate, medal of certificate by the president of the university to her in as a whole university that she got the president award. You know, from the and then you are asking, you are telling me this. And we are sorry and we are sorry about that. And so I was not too happy. I did not accept their they are sorry or anything and I said OK and I waited for my daughter and she came and she was furious when I told her and I said I don't know even where you want to even come back to here. So anyway, we went home and I told my husband and we called the president and I told I called very first and she called the president. He was a Josuit Besuit priest and ** *** called him and he said I am so sorry it happened. It should have never happened like that. So, you know, then they sent me a letter of pardon, asking for pardon and they always ask for, you know, donations of every year and all that. But I was not too happy. And so, so that was the, that was another story that I encounter, racism I encounter."
  },
  "When did you first arrive to the Midwest?": {
    id: 20,
    category: "Arrival",
    videoId: "V1-0034_Mariamma_Full_Interview_Clipping00024813.mov",
    transcript: "I arrived here in Chicago area in October or not in October of 19, 2009, 2001."
  },
  "please tell me about your journey to the Midwest.": {
    id: 21,
    category: "History",
    videoId: "V1-0036_Mariamma_Full_Interview_Clipping00027202.mov",
    transcript: "When we were living in from Boston, we moved to New Jersey again and in a different city closer to New York, because my, my husband was going to for his PhD in New York, Greenwich Village for his PhD in social work. And he, we were there for, for maybe about a year. And then then my husband, while he was in the Graduate School, he, he was looking for job markets and then he found a job in Iowa, Buena Vista College in sociology and social work. So he applied for that and for so the president of the university came to New York and he invited us to go there to have the interview with him. He wanted me to go with him also. So we both went there and had the interview. So he said we would like you to come to Storm Lake, IA and see the place before you take your job. It is a small place so we would appreciate if you can come and see the place before you take the job. So So we said it is OK, you know that we will do that. So we went to Storm Lake from from New Jersey in a in a in the plane to up to Chicago and from Chicago we travelled in the then overnight and trains trained. So the train was it took us a almost a a whole day, whole night. So and then when we got there, someone from the college came and picked picked us up and took us to the to their house. It was a nice family and we stayed with them and then we went for the interview at the college."
  },
  "When and why did you move to Iowa ?": {
    id: 22,
    category: "History",
    videoId: "V1-0042_Mariamma_Full_Interview_Clipping00041099.mov",
    transcript: "AG Thomas, My husband and I moved to moved from New Jersey to Storm Lake, IA in in August of 1964 to take a job at Buena Vista College as a sociology professor."
  },
  "What is your citizenship story? When did you receive it?": {
    id: 23,
    category: "History",
    videoId: "V1-0044_Mariamma_Full_Interview_Clipping00043577.mov",
    transcript: "I am a U.S. citizen and I became a U.S. citizen in 1978."
  },
  "What was your feeling about the US? Did you want to come? When you came? Did you intend to stay or to leave?": {
    id: 24,
    category: "Arrival",
    videoId: "V1-0046_Mariamma_Full_Interview_Clipping00044229.mov",
    transcript: "Yes, I was interested to come to US because I heard so much about United State and the life here. So I wanted to come. I was interested and I came in, you know, I came in 1961."
  },
  "How did you come to the US and why did you move to the different places you went?": {
    id: 25,
    category: "History",
    videoId: "V1-0048_Mariamma_Full_Interview_Clipping00050957.mov",
    transcript: "I came to the United States as a nurse in Newark, NJ, and I met my future husband in in three weeks. He came from Boston with a friend and he heard about that. Somebody told him that you know there is someone from his area here. So he came with his friend to see me. Then I was I did not know why he is came and I was surprised to see somebody because there were no Indians there and I was surprised to see and Nehave I was happy to see someone from India especially from Kerala. We speak the same language. Then he went back or they went back and he called me and talk. We called and talk to talk to each other and he said I was looking for and I am interested to marry and if you are willing and I said I have to ask my parents. He said I have to ask my parents too. So I said OK we will talk about this again. So he came, actually he came and visited me 2-3 times and I also went to Boston and visited him and then he got married in six months in Attleboro, MA. And then I moved from Newark, NJ to Boston where he was. He was going to Boston University for his graduate degree in sociology. So I moved to Boston in September of 1961. Then then we, I was, we were there for until 63, first January and then we moved to New Jersey in they are closer to New York in Hackensack, NJ. And that's where he went that from there, he went to for his PhD program in in Greenwich Village, New York. And while we were there and I became pregnant and I also went his part time to school, but I didn't continue because I became pregnant."
  },
  "What did you expect your life would be like in the US or in Iowa? Did the reality match your expectations?": {
    id: 26,
    category: "Arrival",
    videoId: "V1-0054_Mariamma_Full_Interview_Clipping00058910.mov",
    transcript: "I didn't I didn't know very much about United States life, life in United State, but I had some idea because we I have was trained in the hospital where the IT was started by American missionaries. So there were lot of foreign missionaries as well as the doctors there and they then we always where taught to use only for knife and spoon and fork to eat and speak in English even in our in our school in our rooms. So we were encouraged by that and we did that. And so that helped me, you know, when I came to, came to United State. So their life, you know, it was pretty, it was easier for that to adapt, you know?"
  },
  "How are you treated by other Americans once you were in the US?": {
    id: 27,
    category: "Social Life",
    videoId: "V1-0056_Mariamma_Full_Interview_Clipping00063106.mov",
    transcript: "At most part every everybody treated me when I was in in Newark, NJ. Of course, there were not any other students or in doctors or any new DOE everybody. It was all white people there. And when we moved to New Jersey second time, of course that time we had some discrimination in when I have been, we were looking for a bigger apartment because we needed that for for when Betty was going to be coming soon."
  },
  "Did you encounter any other instances of racism or discrimination?": {
    id: 28,
    category: "Activism",
    videoId: "V1-0058_Mariamma_Full_Interview_Clipping00064657.mov",
    transcript: "I was pregnant, about 7-7 months pregnant. I of course were wearing a sari. That's my that's my dress for in India, Indian dress. I was wearing and and I saw and and I looking for an apartment and I saw an advertisement and I saw that I called them and made an appointment and she said, OK, come on, come on and see you could come right away. So I walked to the place. This was July and it was really hot, hot at that day or what day and I walked down there and got into their apartment and been I'm sorry of their their office and this the owner or the agent, she said, Oh, I'm sorry. I just we just, you know, rendered and that was a big blow on me. I was so sad to hear that. And so anyway, I walked back to my apartment and I called my husband. He was working on a part time job in the hospital nearby and he I called him and and I was crying and he said why are you crying? I said, you know, I went to the see the apartment and they said it is already rented. So I think that they did not like me or what it is, I do not know. It may be discrimination. So the guy who was working with him heard that and heard me crying. So he called somebody and I think he called the major mayor of that Siri and he actually found a better place for us to live to move. So, so that is how, you know, we found an apartment there. So it was not really too many times we experienced the the discrimination, but we did some."
  },
  "Describe your initial experiences upon arriving in the United States.": {
    id: 29,
    category: "Arrival",
    videoId: "V1-0060_Mariamma_Full_Interview_Clipping00070651.mov",
    transcript: "When I came to New York and I was got out from the pier, it was almost 2:30 in the morning and when I got out it was cold. It was February and there was there was snow on the ground and I of course did not have a boots and had no jacket and not really heavy jacket. So that was kind of an experience. It was different than what I expected. But then I also then I went with this person who came to pick me up. He was sent by one of my relatives friend, you know. So he came to pick me up and took me to house one of his friend's house and I stayed overnight and they took me to the bus station the next morning and put me to go to, to the to the to go in the bus to New York, New Jersey. But when I got into the go to the bus station, I had to go through an escalator and I did not know what it is escalator like. So I was on the escalator with my huge suitcase with all my belongings and I it was so heavy and the escalator was full people, full of people and the people behind me. I always was going backward and the people behind me where very supportive and they put they support me and so I wouldn't fall fall backward. So that was a good experience and then I got into the bus and reached to the my designated place."
  },
  "How did you feel as you started the journey to the US?": {
    id: 30,
    category: "Arrival",
    videoId: "V1-0062_Mariamma_Full_Interview_Clipping00074333.mov",
    transcript: "I went to Newark, NJ and my Beth Israel hospital for and reported for reported to my Superintendent, nursing Superintendent and then she sent me to have lunch, lunch in the cafeteria with her assistant. So I went and had picking up some lunch, lunch, food, lunch on the cafeteria and there was cold carts and lunch meat and it was so cold when I start to sit down and eat. And it was, it was really different and was I was not able to eat. But the lady who took me, she said you could go and pick up something different. They said that's OK, I will, I will, I am OK, you know, that's all right. So that was a good experience."
  },
  "Where and how did you first find a place to live? Was it satisfactory?": {
    id: 31,
    category: "Housing",
    videoId: "V1-0062_Mariamma_Full_Interview_Clipping00074333.mov",
    transcript: "When I came to the United State, I had a place to already. I had a place to live that was in the student nurses dorm. I had a room provided and with all the necessities and the food was provided in their cafeteria. So it was it was really a good place and I had no problem. I enjoyed that place. From there, the when we moved to to Iowa, we had a we had a apartment for a couple of days and and for a few days and then we look for a house and we rented a house and in after two years we bought a house in Storm Lake, IA and which was number problem. We had a a choice where we could where we want to live. We had a choice and we could buy the house anywhere in Storm Lake, IA.So there was number problem with that."
  },
  "What brought about subsequent moves?": {
    id: 32,
    category: "History",
    videoId: "V1-0066_Mariamma_Full_Interview_Clipping00080181.mov",
    transcript: "We moved to, we moved to Illinois because one of my, my one of my daughters, my oldest daughter were living in in Naperville, IL and we were, we were retired, of course, and we were older or two. And so we thought we will be wise to move to closer to one of our daughters.So that is the reason we, we were looking for a place. We came and looked for a place and find a found a smaller house with a new basement and, and all other things. You know that we needed it. We we, we bought that house and we moved to that house in 2001."
  },
  "What kind of help did you need in the early years here? Who helped you?": {
    id: 33,
    category: "Social Life",
    videoId: "V1-0068_Mariamma_Full_Interview_Clipping00082600.mov",
    transcript: "When I came to the United States in 1961 of February, it was cold and it was, of course, winter time and cold outside, and I needed to buy boots and jackets. So there were people in the Nurses Dome. They were senior students. They were willing to help me to go and to the store and buy, you know, help me to do that.And so they arranged, they called someone some of their friends and one lady came and took me. And so that was a great help. And she was a friend actually until I have so many years and then I go, I got in then not maybe lost our connection after so many years after I moving to Storm Lake, IA. And also the first thing I had the my some friends where I 2-3 days after I was at the with Israel Hospital and I worked worked for couple of days. And I was on the elevator with another lady. was little more older than me. And she started a conversation and asking me where, where I am from India. And I said yes. And she said, oh, I know a person. I know a family from India and she was pleased to talk about to me about how I she is so interested to continue, you know, interested to continue to have some, some close contact with me for after. So she came and she said and actually we exchanged telephone numbers and she called me and she came and pick me pick me up, you know, and took me to her house in to Montclair, which is about a little further away than from from New York. So she and her husband came and picked me and then had dinner with them and actually I stayed with them and then she brought me back to what we were to back to my nursing, nursing play, nursing dorm. And I actually enjoyed going with her to the hall, to church with her. And so we had a real connection for a while, for a long time. In fact, I got married in 1961, February, in December, in September, September. So she and her husband, they said your parents are not around here. So could could we could, could guy, you know, that was his name, could guy could walk you down to the aisle for on your wedding. And I said that's fine. So he walked me. He walked me down to the aisle on for my on my wedding and they were friends for a long long time. When we moved even to Iowa they came and visited me couple of times. So they were good friends and good connection with them and we we enjoyed their family as well."
  },
  "Did you encounter any instances of racism or discrimination, and how did you cope withthese challenges?": {
    id: 34,
    category: "Activism",
    videoId: "V1-0071_Mariamma_Full_Interview_Clipping00151938.mov",
    transcript: "When when I was in the living in in Storm Lake, IA, my daughter Suma was as a transfer to her, she wanted to go to Creighton University for the two years to graduate and she had a scholarship from there, tennis and scholarship from there also. So she was at Creighton to register for the classes and I was there. So I went and used the upstairs ladies room and then and then I went and got a cup of coffee in the small cafeteria, students cafeteria. And I was sitting there three men, I think it was three security men approached me and I was little puzzled. What is what are they doing? And they I said, and they actually, he asked me how am I doing? I said fine. And he said, can I can we see your ID? And I said my ID what for? And I said they said or just check. I said check for what? I said, you know, I am a faculty wife from Storm Lake, IA. Storm Lake, you know, Buena Vista College, my husband is a faculty there and I am his wife and I am here to register my daughter for some classes. And they said, you know, yes, we understand that, but could we see your ID? And I said I have no idea why you want to see my ID. And they said, you know, finally they said, oh, we had a somebody look like you in the dormitory, took something from the students dorm and they are looking for that person. And I said, oh, OK, you saw somebody look like me. Ah, what what is that means? I am I am sitting here. If somebody took something, they would not be sitting here. And they said, please could we see your ID? And so finally I gave in and showed them the ID and they said sorry. And then they left. And I did not accept their sorry, but I, I waited for my daughter and she came and I when she came, I told her the what happened And she was really furious when she heard that. And then when she when we we went home to Storm Lake and I told my husband and we called Berry and told her she was in Minneapolis is their first year job. And she said, I just cannot believe I was the student student students award. You know, the all the all Unity Students award I had last year given by the president and they, and now they are saying that you are, you took something. So she called the President and you know, the president said, you know, she, he is very sorry and he was, he told them that you know that he is, he will be as he is. He is very, he is not very happy about it, but it happened, you know, and he is sorry about it. You know, he said, you know, please excuse, please forgive us. And then he said so."
  },
  "How did you navigate feelings of alienation or homesickness, and were there anysupport systems that helped you during difficult times? Were you expected tohelp out relatives back in India?": {
    id: 35,
    category: "Social Life",
    videoId: "V1-0075_Mariamma_Full_Interview_Clipping00168768.mov",
    transcript: "In, in when we were in New Jersey, when before Berry was born and we were going to a church and, and there, you know, one lady and we were, we had good friends there. And then one lady actually she initiated and did a baby shower for Berry. And so, and she was a work, she was a secretary at the UN and she was working at the secretary at the UN and she was very, very friendly with us. And we wondered, she wanted us to continue friends with us. And so she had, you know, you know, organized a baby shower and we, they brought so many things in for, for the baby. And she continued to, to be friends with us even after we moved from there. And then we, we had some friends who were, you know, that they, they gave us, you know, they brought us one of my, this lady who I knew, she actually, when Barry was born, she came, I am almost 3030 miles from her home to where we were living when, when he was born, she came most every day for a week. And she came and gave Barry a baby a bath. And then she brings some soup and, you know, light food for, for me. And that was very, very helpful. And I did not have anybody else, you know, of course, in this country at that time. And so that was a great thing. I always remember that. And she continued to be a friend."
  },
  "What challenges did you face in securing or maintaining suitable Housing?": {
    id: 36,
    category: "Housing",
    videoId: "V1-0077_Mariamma_Full_Interview_Clipping00173650.mov",
    transcript: "We had a fire in nineteen, 2000, actually 2001 and it was unexpected and we had no clue how it happened, but and we got out luckily. And then soon after the whole lot of the free build from the community as well as the neighbors and the firemen of course came and and you know, stopped the fire. And then it was fire that that destroyed all our downstairs properties, freezers, washing machine, my summer clothes, everything is burned. And also all the all the equipments for exercise and bedroom and all that were burned. But it was more than that. We know none of us got any any harm anyway. So we did. We got out that in the right time and Mary was visiting at that time also at that our house. So the, the community came as well as then the insurance guy came and he offered money and to buy clothes for the night and he reserved some rooms for hotels rooms. And also lot of people said you could stay in our house home, you know, for the time being, you know, you could stay with us. It is no problem. And they offered food and other things that, you know, even after we moving to the, to the hotel for three weeks. And they were very nice and friendly and we had a, we had such good friends, you know, in Storm Lake, IA too."
  },
  "What impact did Indo-U.S. relations have on your life? Did they affect how you weretreated by other Americans?": {
    id: 37,
    category: "Social Life",
    videoId: "V1-0079_Mariamma_Full_Interview_Clipping00179236.mov",
    transcript: "We had some open discussion, especially with my husband. You know he is, he loves to talk politics and he is, I enjoy talking to people about politics and he was enjoying it. And then they had a good time talking each other. There was number problem in talking about the relation between India and US."
  },
  "What challenges did you face in accessing Health care?": {
    id: 38,
    category: "Health",
    videoId: "V1-0083_Mariamma_Full_Interview_Clipping00183026.mov",
    transcript: "Since we were married and we always had the insurance and we, we thought, you know, it will be safe that if you have insurance. So even though we did not have much money, but we always paid for the insurance. And then once we were in Iowa, you know, we had he had a job at the college and then they paid for I think part of it or I do not know for sure that they paid the whole insurance or we paid half of it. But we had the insurance. There was number problem with that. So we continued to pay for that and we had it until after we retired. So there was number problem with the insurance."
  },
  "what challenges do you face in social support, if if any?": {
    id: 39,
    category: "Social Life",
    videoId: "V1-0087_Mariamma_Full_Interview_Clipping00191021.mov",
    transcript: "We did not have many challenges in and the social support we had wherever we were in New Jersey or in Iowa or in New York, where I was, it was people were willing most of the time or almost all of the time. People were very willing to help if we needed some help and also they were friendly. And so the community we done the the in New Jersey, we had the students and also some other families. They were pretty good friends. And then when we moved to Iowa, we made really good friends. They were the colleagues of my husband from college and they even invited them even I remember the first Berry was not a year old when we moved to Iowa to Storm Lake, IA. And we had we wanted to celebrate her birthday. And it is, you know, our Indian feeling. So I said, you know, I want to have a big birthday, you know, celebration for Barry. So my friend, you know who is from the college faculty, his wife, our good friend, she said, OK, why don't I have you come, you bring the child and then we will celebrate, you know, in our house. So she and I, she said I give you give me some of the names. So I gave her the names and I also called the people. We did not have time to go or to send an invitation or anything. So we had so many people from the college, we were there maybe about just a few months only by the time she had her birthday. So we had so many people from the college and also some of the neighbors and they came and we had a big birthday party for Barry. So that was really nice. And then we continued to have good friends in Iowa and then when we moved to Illinois, we also made some good friends there. So we did not have any problem with the social support."
},
"Can you tell us an instance of good social support you had?": {
    id: 40,
    category: "Social Life",
    videoId: "V1-0089_Mariamma_Full_Interview_Clipping00203590.mov",
    transcript: "In 1967, we went to my My husband and I went to India to see our parents. I never met his parents or he never met my parents and my parents were older. So what happened was, you know, we had some friends, they said, you know, go and see your parents. You know, we will take care of the babies. Do not worry about South. They are the Williams older girls and then also the Dollopsons older children, you know, like they were called college girls. They came and and stayed within our house and took care of these four girls. And it was really hard to think about it. But if I did not go that time, I would not have been able to see my parents and my mother. My father actually died in 1968. And my mother, yeah, my mother passed away in 69. So that was in a way that was a blessing that we could go and see them at that time and we and it was very appreciative that even though we worried about the children, but they took care of them very nicely and very carefully. So we were, we are thankful for that."
  },
  "So what challenges, if any, did you face with financial needs?": {
    id: 41,
    category: "Finances",
    videoId: "V1-0091_Mariamma_Full_Interview_Clipping00206647.mov",
    transcript: "We were in in New Jersey. My husband worked part time and I, even though he was going to school for his PhD and I worked part time. I worked for some and then until I was not able to go for when I was because I was pregnant, but I did work and we saved some money S when we went to when we went to to Iowa, we had enough money for to buy a or buy to for a down payment for our for to buy a house. So it was not a big problem for we did not have to borrow, but we of course had to get money from the bank to the loan. The rest of it, you know, and we had to pay the rest of it in every month, you know that to pay off."
  },
  "So what aspects of Indian culture, traditions or lifestyle did you miss the most while living in the US?": {
    id: 42,
    category: "Social Life",
    videoId: "V1-0093_Mariamma_Full_Interview_Clipping00208882.mov",
    transcript: "Here in special days like Christmas and Easter and we celebrate like that the same way we celebrate in in India, maybe in a different way. But we always gave much much as time and the time for time or importance in in Easter time and Christmas time because because it was very, very important times of the for for Christians. Those two times where so we celebrated in a different way though. But here mostly the Christmas were lot of Christmas trees and stuff like that. And that was not common in India at that time. When I was growing up, there were no Christmas trees or sand das or some things like that, but we had a Christmas. We had just the, the big the, the they had. We had instead of that we had celebrated in a different way and then we had a relative relatives come and also they we had good food cooked different foods and all that. So we had a great time we celebrating also. So we celebrated well and here it is more we are in traditional way and here it is more like commercialized way that did Christmas and all because you know the descender and the Bernie for Easter and all that kind of stuff as it more importance, you know."
  },
  "How did you maintain a connection to your cultural roots, and did you participate in anycultural or religious activities?": {
    id: 43,
    category: "Social Life",
    videoId: "V1-0097_Mariamma_Full_Interview_Clipping00218578.mov",
    transcript: "In New Jersey, we didn't have any Indian community or other other people from other countries. And, and in Boston we had, we had students, graduate students from different universities, from different countries actually to they would love to come to my our apartment to have a meal. And my also my husband was very much also interested too. So he, we, he entertained them most very every most every weekends with the, with the, with those students. And they continued until they left Boston. From there they went to New Jersey and from back to, from then from there to to Iowa, Iowa. Then we never had any, any Indians or other nationals. They were the only outside of the community. So there was a one family of Pakistanis. They left us soon, six or six months after I think, you know, we went there and then we had after, after that, you know, So then, then maybe in the 70s we had some, you know, people from Vietnam, from Daos, Laos, from, from, from, not from China or, you know, people, you know, with the, the churches sponsored them and they were there. And we, we all, we always invited them for Christmas in our house. And I remember this particularly one family, they had seven children and they came to our house and in for the Christmas and we they enjoyed and we had a good time. And they were really, really, Yeah. We continued to have friends with them until we left. And then also the, we always, you know, enjoyed any other cultural, cultural thing like, you know, regular American, like 4th of July or 4th of July or any other important days. We celebrated with the, with the, with the, with everybody else, you know, like everybody else, we celebrated with them. And in the, in those days, those times too, So we enjoyed and there also the church churches too. We had a we celebrated with all their special days with the with the Christians there too."
  },
  "How did your perception of the \"American Dream\" evolve over time, and did it align withyour expectations?": {
    id: 44,
    category: "Reflections",
    videoId: "V1-0099_Mariamma_Full_Interview_Clipping00225180.mov",
    transcript: "The best part was the I we had, I made some friends and they were lifetime friends. So that was a good thing. And then we also had, I met my future husband and you know, in a short period of time after I came and I, we got married. And then I have, I have a family which I really have a great time, you know, remembering them, you know, they are the best, you know, they are the the best thing happened to me in my life. And so, and they are, they have 4 girls who are who were born in one in New Jersey and three in Iowa. And they were educated well, well educated, independent and as beautiful women. And then they are are in different parts of America working and then they are enjoying their life too. And we are so proud of them and I was, I am so proud of them and I see them over."
  },
  "What advice would you give to future generations of immigrants pursuing theirown American Dream?": {
    id: 45,
    category: "Reflections",
    videoId : "V1-0101_Mariamma_Full_Interview_Clipping00229578.mov",
    transcript: "Future generation, if anybody wants to come to America and they should have the attitude to work hard in the 1st place any kind of job, you cannot say that you know I am a doctor or I am AI am an engineer or I am I have a degree in this. And so lot of times those degrees are not honoured here in America. So you have to go for further advanced degree, advanced education in that field to get a job. And if you are a doctor, you have to take the, the, the, the license for that which you have to study hard. And so don't expect that when you come to America, because because coming to America is a good wish. But do not expect that everything is, is, you know, given to you and given, given, given to you freely. But you have to work very hard and you have to, you have to be willing to do that if you want to come to them. So work hard and get a good education and so hope and hope that you get a chance if you want to come to America."
  },
  "You know, did your initial idea of the American dream match what you experienced?": {
    id: 46,
    category: "Reflections",
    videoId : "V1-0103_Mariamma_Full_Interview_Clipping00235034.mov",
    transcript: "My dream was, you know, I, when I came to the state to get advanced education and I, I got a degree in social work and I worked as a nurse and I, and I accomplished that and I feel that I accomplished that. And I got married, of course, and have a family and my husband also accomplished what he was hoping for. And, and my we got four daughters and they, we were, we were hoping to have a good education for them when they were born and we taught them your equation is very important. Even when they were small children and my husband was very particular to talk to them. That education is very important. And then also you are minority and you are girls, you are women. So that is 2 things you know that will be a dent for your hope. So only what you can do is try hard and get a good education so that you do not have to depend on anybody and you can get a good job and get a get a good job and then stand on your feet. And so so they accomplished that. Then they were very good about that. And then they all, I should say, complete each other or they are good students and they finished high school and college and then then they got good education and then they got good jobs in as, as I already mentioned that he is a teacher. And as I, as I mentioned, you know, Sheila and Suja and Suma, they all accomplished and, and people and they are, they had very good job and very good educational background. So they do not have to worry about in their life. So they are very, they were, they are very proud of it. And I am so proud of them.I am so proud of them that you know, I, I can, I can die that I didn't. They are in good stand. Good, you know, good stand.A"
  }
}

const IDLE_VIDEOS = { 
  ashraf: "1KVfcz0A15BW4jLRNTG5jf0tPoElPJn7q", // Set to a default ID
  mariamma: "1gYgN2hv-LPDVQWhi426leGXc-C-0trvg" 
};

const FALLBACK_VIDEOS = { 
  ashraf: ["1Wh3enwn1ZZbYihLN3QH_1_723oPbdgT9"], 
  mariamma: [] 
};

// HELPER: Fetches the raw video stream using the Google Drive API Key
const getVideoUrl = (person, videoId) => {
  if (videoId && videoId.length > 15) {
    return `https://www.googleapis.com/drive/v3/files/${videoId}?alt=media&key=${GOOGLE_DRIVE_API_KEY}`;
  }
  return ""; 
};

// --- SUB-COMPONENT: InterviewPage ---
const InterviewPage = ({ person, name, setCurrentPage, currentResponse, setCurrentResponse, question, setQuestion, handleAskQuestion, isThinking, chatHistory, videoRef, chatEndRef, suggestedTopics, currentCategory }) => {
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
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
            {/* UPDATED: Changed back to <video> to support autoPlay and onEnded looping */}
            <video
              ref={videoRef}
              key={currentResponse ? currentResponse.videoId : IDLE_VIDEOS[person]}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              controls={!!currentResponse}
              autoPlay
              muted={!currentResponse} 
              loop={!currentResponse}
              onEnded={() => setCurrentResponse(null)}
            >
              <source src={currentResponse ? getVideoUrl(person, currentResponse.videoId) : getVideoUrl(person, IDLE_VIDEOS[person])} type="video/mp4" />
            </video>
            
            {!currentResponse && (
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '8px 16px', borderRadius: '4px', fontSize: '0.9rem', pointerEvents: 'none' }}>
                Ready for your question...
              </div>
            )}
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

  // Auto-play the video when currentResponse updates
  useEffect(() => {
    if (currentResponse && videoRef.current) {
      videoRef.current.play().catch(error => console.log("Auto-play prevented:", error));
    }
  }, [currentResponse]);

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
        
        setCurrentResponse({ question: "I don't have a direct answer.", id: null, videoId: randomFallback, person, isFallback: true });
        setChatHistory(prev => [...prev, { type: 'bot', text: "I'm sorry, I don't have a direct answer for that recorded." }]);
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
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', backgroundColor: '#111', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      <header style={{ width: '100%', backgroundColor: 'white', borderBottom: '1px solid #eee', padding: '24px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#000' }}>SAAPRI</div>
          <div style={{ height: '32px', width: '1px', backgroundColor: '#d1d5db' }}></div>
          <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>South Asian American Policy & Research Institute</div>
        </div>
      </header>
      <div style={{ flex: 1, width: '100%', padding: '60px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div style={{ borderTop: '4px solid #22c55e', paddingTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '24px' }}>Life in the Midwest Before 1965: Ask a South Asian Immigrant</h1>
            
            <div style={{ maxWidth: '850px', lineHeight: '1.6', color: '#d1d5db', marginBottom: '32px' }}>
              <p style={{ marginBottom: '20px' }}>
                The journey of South Asians who came to Illinois between 1945 and 1965 remains one of the great untold stories of American immigration. In late 2005, SAAPRI began collecting the oral histories...
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