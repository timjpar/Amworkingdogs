import type { FaqItem } from "@/app/_types";

/**
 * Questions we actually get asked, by phone and at the gate.
 * Answers are plain text — they feed both the accordion and FAQPage schema,
 * so keep them self-contained (no markup, no "see above").
 */

export const faqItems: FaqItem[] = [
  {
    question: "What exactly is a livestock guardian dog?",
    answer:
      "A livestock guardian dog lives with your animals full time and treats them as its own. It is not a herding dog — it doesn't move stock, it protects it. The job is done mostly by presence: patrolling, marking, barking at what doesn't belong, and being large enough that coyotes, stray dogs, and hawks decide to hunt somewhere else.",
  },
  {
    question: "Why Kangal crossed with Great Pyrenees?",
    answer:
      "The Kangal brings size, courage, and a strong protective drive. The Great Pyrenees brings patience, tolerance of handling, and a gentler default around young stock and children. At 75% Kangal and 25% Pyrenees you get a dog serious enough to do the work and steady enough to live with.",
  },
  {
    question: "How much are the puppies?",
    answer:
      "Puppies are $800, males and females alike. A $200 deposit holds your pick from the current litter and is applied toward the total. Deposits aren't required for same-day pickups.",
  },
  {
    question: "How old are the puppies when they go home?",
    answer:
      "Eight weeks is our normal go-home age. By then they are weaned, eating well, and have spent their whole lives around poultry and stock. If you need us to hold a pup a little longer while you finish fencing or a shelter, we can usually work with you.",
  },
  {
    question: "Are the puppies already bonded to livestock?",
    answer:
      "They start bonded. Ours are whelped on the homestead and raised among chickens, ducks, and other animals from the day their eyes open, so livestock is simply normal to them. That head start matters, but the bond that counts is the one they form with your animals, so plan to place your pup with its stock right away.",
  },
  {
    question: "Do they come with shots and a health check?",
    answer:
      "Every puppy gets a health check before it leaves and goes home with its age-appropriate worming and first vaccinations, plus what we've fed and how we've handled it. We'll always tell you exactly what has and hasn't been done.",
  },
  {
    question: "Will a guardian dog kill my chickens?",
    answer:
      "A well-raised guardian pup raised with poultry doesn't view it as prey — but a bored adolescent will absolutely play too rough. The four-to-ten-month stretch is where most poultry losses happen, and it's a supervision problem, not a temperament problem. Correct it early, keep the pup with an adult dog or in a smaller pen when unsupervised, and it passes.",
  },
  {
    question: "How much fence do I need?",
    answer:
      "More than you think. These dogs expand their territory as they mature and will take a wider perimeter if you let them. Solid field fence at least five feet high, no gaps at the bottom, and gates that latch. Electric alone is not enough for an adult. Good fencing is the single biggest predictor of whether a guardian placement works out.",
  },
  {
    question: "Do they bark a lot?",
    answer:
      "Yes, especially at night — that's the job. Barking is how a guardian announces the perimeter is occupied, and most predators never get closer than that. If your nearest neighbor is a hundred feet away, think carefully about whether this is the right dog for your place.",
  },
  {
    question: "Can they also be a family dog?",
    answer:
      "They can be both, and ours are handled daily so they're comfortable with people. But a guardian that lives in the house stops guarding. The usual arrangement that works: the dog lives with the stock, and the family goes out to it — feeding, checking, and handling every day so it stays social and easy to work on.",
  },
  {
    question: "How big will they get?",
    answer:
      "Expect 90 to 140 pounds grown, with males at the top of that range, and roughly 28 to 32 inches at the shoulder. They mature slowly — a two-year-old is still filling out and still learning the job.",
  },
  {
    question: "Do I need two dogs?",
    answer:
      "For a small poultry flock on a few acres, one is usually plenty. For sheep, goats, or open ground with real predator pressure, two working together is far more effective — one holds the stock while the other pushes out to the threat. It's also easier on the dogs.",
  },
  {
    question: "Where are you and can you deliver?",
    answer:
      "We're in Newport, Tennessee, in the foothills of the Smokies. Most buyers pick up here at the farm, which we prefer because you get to meet the parents and see how the pups are raised. For longer distances we can help arrange third-party ground transport at the buyer's cost.",
  },
  {
    question: "How do I pay?",
    answer:
      "Cash at pickup, or PayPal, Venmo, Cash App, or card for deposits and remote payments. Call or text Michael at 423-540-6566 and he'll set it up.",
  },
];
