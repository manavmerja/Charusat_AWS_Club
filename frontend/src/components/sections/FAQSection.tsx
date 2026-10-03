"use client"

import React from "react"
import Image from "next/image"
import { AWSOrbitingCircles } from "@/components/ui/aws-orbiting-circles"
import { Ripple } from "@/components/ui/ripple"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@/components/animate-ui/components/headless/accordion"
import { LightRays } from "@/components/ui/light-rays"

const awsServiceSlugs = [
  // Ring 1 (5) - Core AWS Compute
  "amazonwebservices",
  "amazonec2",
  "awslambda",
  "awsfargate",
  "amazoneks",
  
  // Ring 2 (8) - Storage, DB, Analytics, Network
  "amazons3",
  "amazondynamodb",
  "amazonrds",
  "amazonroute53",
  "amazonapigateway",
  "amazoncloudwatch",
  "amazonecs",
  "amazonredshift",

  // Ring 3 (12) - Cloud Architecture, DevOps & Stack
  "amazonsqs",
  "amazoncognito",
  "docker",
  "kubernetes",
  "terraform",
  "ansible",
  "jenkins",
  "github",
  "git",
  "linux",
  "redis",
  "cloudflare",
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
      {/* Seamless Blend Transitions */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-black/70 to-black pointer-events-none z-20" />

      {/* Light Rays Background (Top-Center God Rays) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-65">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.8}
          lightSpread={0.8}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.04}
          distortion={0.04}
          pulsating={false}
          fadeDistance={1.2}
          saturation={1}
          className="w-full h-full"
        />
      </div>

      <div className="text-center mb-16 space-y-3 relative z-10">
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
          <div className="relative flex items-center justify-center w-full max-w-[20rem] sm:max-w-[26rem] lg:max-w-[30rem] min-h-[500px]">
            
            {/* Background Ripple Effect */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <Ripple mainCircleSize={150} numCircles={8} color="0, 230, 118" />
            </div>

            {/* Center Logo with Emerald Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#F4F7F5] border border-white/[0.12] shadow-[0_0_60px_rgba(0,230,118,0.3)] backdrop-blur-md flex items-center justify-center">
              <div className="absolute inset-[10%] rounded-full overflow-hidden">
                <Image
                  src="/image.svg"
                  alt="AWS Student Builder Group CHARUSAT"
                  fill
                  className="object-contain scale-[1.15]"
                  sizes="(max-width: 768px) 64px, 80px"
                  priority
                />
              </div>
            </div>

            {/* Orbiting Circles */}
            <div className="scale-[0.85] sm:scale-100 w-full flex items-center justify-center relative z-20">
              <AWSOrbitingCircles iconSlugs={awsServiceSlugs} />
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
              <AccordionItem key={index} defaultOpen={false}>
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