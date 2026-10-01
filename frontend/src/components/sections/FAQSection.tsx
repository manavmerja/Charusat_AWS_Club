"use client"

import React from "react"
import Image from "next/image"
import { IconCloud } from "@/components/ui/icon-cloud"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@/components/animate-ui/components/headless/accordion"

const awsServiceSlugs = [
  // AWS Compute & Serverless
  "amazonwebservices",
  "amazonec2",
  "awslambda",
  "awsfargate",
  "amazonecs",
  "amazoneks",
  "awselasticbeanstalk",
  "amazonlightsail",

  // AWS Storage & Database
  "amazons3",
  "amazondynamodb",
  "amazonrds",
  "amazonaurora",
  "amazondocumentdb",
  "amazonredshift",
  "amazonefs",
  "amazontranscribe",

  // AWS Security, Identity & Governance
  "awsiam",
  "awssecretsmanager",
  "awswaf",
  "amazoncognito",
  "amazonsnowball",
  "awscloudtrail",
  "awsbackup",
  "awsorganizations",
  

  // AWS Management, DNS & Networking
  "amazonroute53",
  "amazonapigateway",
  "amazoncloudwatch",
  "amazoncloudformation",
  "jenkins",
  "cloudflare",
  "github",
  "amazontimestream",
  "amazonmanagedblockchain",
  


  // AWS Messaging, App Integration & Analytics
  "amazonsqs",
  "amazonsns",
  "amazonappflow",
  "awsamplify",
  "amazonsagemaker",
  "amazonathena",
  "amazonkinesis",
  "amazonquicksight",
  "amazonglue",

  // Cloud & DevOps Architecture Core
  "terraform",
  "docker",
  "kubernetes",
  "ansible",
  "linux",
  "git",
  "amazonopensearchservice",
  "redis",
  "awsiot",
]

const faqs = [
  {
    question: "Who can join the AWS Student Builder Group at CHARUSAT?",
    answer:
      "Any currently enrolled student at CHARUSAT University can join! We welcome students from all branches and years -- whether you are a beginner curious about cloud computing or an experienced developer looking to deepen your AWS skills.",
  },
  {
    question: "Do I need prior AWS or cloud experience to join?",
    answer:
      "Not at all! The group is built for learners at every level. We run beginner-friendly workshops, certification preparation sessions, and hands-on labs so you can start from zero and grow at your own pace.",
  },
  {
    question: "How can I get AWS certifications through the club?",
    answer:
      "We organize structured certification prep programs aligned with AWS Cloud Practitioner, Solutions Architect, and Developer tracks. Members gain access to AWS Skill Builder resources, mock exams, and group study sessions led by certified mentors.",
  },
  {
    question: "What kind of events does the club host?",
    answer:
      "We host cloud architecting workshops, hackathons, guest speaker sessions from AWS professionals, open-source contribution drives, and community meetups. Follow our socials to stay updated on upcoming events.",
  },
  {
    question: "Is there any membership fee?",
    answer:
      "Membership is completely free! As an official AWS Student Builder Group, we are backed by AWS's student community program. Some events may have nominal lab costs, but core membership and most activities are free of charge.",
  },
  {
    question: "How do I get involved with leadership or organizing events?",
    answer:
      "Active members who demonstrate passion for cloud technology and community building can apply for core team positions each semester. Reach out to us on Discord or LinkedIn to express your interest -- we love motivated contributors!",
  },
  {
    question: "Will the club help me land internships or jobs in cloud?",
    answer:
      "Yes! Beyond technical skills, we help members build their cloud portfolio through real project work, AWS certification credentials, and networking opportunities with AWS evangelists and partner companies who actively recruit from our community.",
  },
]

export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center px-6 sm:px-12 py-24 overflow-hidden"
    >
      <div className="text-center mb-16 space-y-3 relative z-10">
        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-[#00e676] border border-emerald-500/20">
          Have Questions?
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Find answers regarding membership eligibility, club activities, certifications, and how to get involved.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-0 relative z-10">
        {/* Left Side: 3D AWS Icon Cloud with Center CHARUSAT Logo */}
        <div className="flex-1 flex items-center justify-center py-4 lg:py-0 w-full">
          <div className="relative flex items-center justify-center w-full max-w-[20rem] sm:max-w-[26rem] lg:max-w-[30rem]">
            
            {/* Center Logo with Emerald Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-20 w-20 sm:h-24 sm:w-24 rounded-full flex items-center justify-center bg-black/90 border border-[#00e676]/30 shadow-[0_0_60px_rgba(0,230,118,0.35)] backdrop-blur-md">
              <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                <Image
                  src="/image.png"
                  alt="AWS Student Builder Group CHARUSAT"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 48px, 64px"
                  priority
                />
              </div>
            </div>

            {/* Interactive 3D Icon Cloud */}
            <div className="scale-[0.85] sm:scale-100 w-full flex items-center justify-center">
              <IconCloud iconSlugs={awsServiceSlugs} />
            </div>

          </div>
        </div>

        {/* Middle Glowing Divider */}
        <div className="hidden lg:flex flex-col items-center self-stretch py-8">
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#00e676]/30 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[#00e676]/50 my-2" />
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#00e676]/30 to-transparent" />
        </div>

        <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-[#00e676]/30 to-transparent my-2" />

        {/* Right Side: Accordion */}
        <div className="flex-1 w-full max-w-xl lg:pl-12">
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} defaultOpen={index === 0}>
                <AccordionButton showArrow>{faq.question}</AccordionButton>
                <AccordionPanel>{faq.answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}