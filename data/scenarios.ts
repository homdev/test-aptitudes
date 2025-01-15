export interface Scenario {
  id: number
  title: string
  question: string
  correctAnswer: string
  options: {
    id: string
    text: string
    feedback: string
  }[]
}

export const scenarios: Scenario[] = [
    {
        id: 1,
        title: "Lancer une Campagne Marketing pour un Nouveau Produit",
        question: "Votre entreprise vient de lancer un nouveau produit. Vous avez un budget limité et souhaitez maximiser la visibilité. Quelle stratégie utilisez-vous pour promouvoir votre produit et atteindre rapidement votre audience cible ?",
        correctAnswer: "A",
        options: [
        { id: "A", text: "Collaborer avec des influenceurs", feedback: "Bonne idée ! Les influenceurs peuvent générer des résultats rapides, mais attention au coût élevé et à la pertinence de l'influenceur choisi. " },
        { id: "B", text: "Optimiser le SEO du site web", feedback: "Excellente stratégie sur le long terme. Cependant, les résultats du SEO peuvent prendre du temps avant d'être visibles." },
        { id: "C", text: "Créer une campagne de contenu", feedback: "Très bien ! Le contenu engageant peut fidéliser votre audience, mais cela nécessite de la créativité et une régularité importante." },
        ],
    },
    {
        id: 2,
        title: "Augmenter le Taux de Conversion sur le Site Web",
        question: "Votre site web reçoit beaucoup de visiteurs, mais peu d'entre eux finalisent un achat. Quelle action prenez-vous pour améliorer le taux de conversion et inciter les utilisateurs à passer à l'achat ?",
        correctAnswer: "A",
        options: [
        { id: "A", text: "Simplifier le parcours utilisateur", feedback: "Bonne idée ! Un parcours utilisateur fluide réduit les points de friction et augmente les chances de conversion. " },
        { id: "B", text: "Ajouter des pop-ups", feedback: "Attention ! Les pop-ups peuvent être intrusifs et faire fuir les utilisateurs. Utilisez-les avec parcimonie." },
        { id: "C", text: "Offrir une réduction", feedback: "Offrir des promotions peut inciter les utilisateurs à finaliser leur achat, mais veillez à ne pas dévaloriser votre produit." },
        ],
    },
    {
        id: 3,
        title: "Lancer un Blog pour l'Entreprise",
        question: "Vous souhaitez lancer un blog d'entreprise pour attirer du trafic sur votre site web. Quel sujet choisissez-vous pour votre premier article afin de captiver votre audience et renforcer votre crédibilité ?",
        correctAnswer: "B",
        options: [
        { id: "A", text: "Les nouveautés de l'entreprise", feedback: "C'est bien, mais les utilisateurs préfèrent souvent des contenus utiles qui répondent à leurs besoins." },
        { id: "B", text: "Conseils pratiques liés à votre secteur", feedback: "Excellent choix ! Proposer des conseils pratiques renforce votre crédibilité et attire du trafic organique. " },
        { id: "C", text: "Présentation de l'équipe", feedback: "Cela humanise votre marque, mais n'attire pas nécessairement beaucoup de trafic sur le blog." },
        ],
    },
    {
        id: 4,
        title: "Faire Face à une Crise sur les Réseaux Sociaux",
        question: "Votre entreprise fait face à une crise sur les réseaux sociaux après une publication controversée. Quel est votre premier réflexe pour gérer cette situation délicate et protéger la réputation de votre marque ?",
        correctAnswer: "B",
        options: [
        { id: "A", text: "Ignorer les commentaires", feedback: "Mauvaise idée ! Ignorer les préoccupations des utilisateurs peut aggraver la situation." },
        { id: "B", text: "Répondre de manière professionnelle et rapide", feedback: "Bonne réponse ! La transparence et la réactivité sont essentielles pour désamorcer une crise. " },
        { id: "C", text: "Supprimer les commentaires négatifs", feedback: "Cela pourrait empirer la situation en suscitant davantage de méfiance et de critiques." },
        ],
    },
    {
        id: 5,
        title: "Optimiser le Référencement Local",
        question: "Votre entreprise locale souhaite attirer davantage de clients dans sa région. Quelle action prioritaire prenez-vous pour améliorer le référencement local et la visibilité sur les moteurs de recherche ?",
        correctAnswer: "A",
        options: [
        { id: "A", text: "Créer une fiche Google My Business", feedback: "Bonne idée ! Une fiche Google My Business complète améliore la visibilité locale et permet aux clients de vous trouver facilement. " },
        { id: "B", text: "Augmenter le nombre de mots-clés sur le site", feedback: "Attention à ne pas surcharger le contenu avec trop de mots-clés, cela peut nuire à la lisibilité." },
        { id: "C", text: "Créer une newsletter locale", feedback: "Utile pour fidéliser les clients existants, mais cela n'améliore pas directement le SEO local." },
        ],
    },
    {
        id: 6,
        title: "Améliorer la Fidélisation des Clients",
        question: "Vous avez remarqué que vos clients ne reviennent pas après leur premier achat. Quelle action mettez-vous en place pour améliorer leur fidélisation et les inciter à acheter de nouveau ?",
        correctAnswer: "A",
        options: [
        { id: "A", text: "Proposer un programme de fidélité", feedback: "Très bien ! Un programme de fidélité bien conçu peut encourager les clients à revenir. " },
        { id: "B", text: "Réduire les prix", feedback: "Attention ! Réduire les prix peut affecter la perception de la qualité de votre produit." },
        { id: "C", text: "Envoyer des emails de remerciement", feedback: "Bonne idée ! Cela renforce la relation client et montre que vous appréciez leur fidélité." },
        ],
    },
    {
        id: 7,
        title: "Lancer une Publicité Payante sur les Réseaux Sociaux",
        question: "Vous décidez de lancer une campagne publicitaire payante sur les réseaux sociaux. Quel est votre objectif principal pour maximiser l'efficacité de la campagne ?",
        correctAnswer: "B",
        options: [
        { id: "A", text: "Augmenter le nombre de likes", feedback: "Cela peut aider à renforcer la présence sociale, mais ce n'est pas directement lié aux ventes." },
        { id: "B", text: "Générer des leads qualifiés", feedback: "Très bien ! C'est un objectif concret et mesurable qui peut augmenter les conversions. " },
        { id: "C", text: "Créer une vidéo virale", feedback: "Attention à ne pas sacrifier le message de la campagne pour le buzz." },
        ],
    },
    {
        id: 8,
        title: "Augmenter l'Engagement sur Instagram",
        question: "Votre taux d'engagement sur Instagram est faible. Quelle stratégie utilisez-vous pour inciter votre audience à interagir davantage avec vos publications ?",
        correctAnswer: "A",
        options: [
        { id: "A", text: "Publier des stories interactives", feedback: "Excellent choix ! Les stories interactives favorisent l'engagement et la fidélisation. " },
        { id: "B", text: "Augmenter la fréquence des publications", feedback: "Attention ! La qualité prime sur la quantité." },
        { id: "C", text: "Acheter des followers", feedback: "Mauvaise idée ! Cela nuit à votre crédibilité et n'apporte pas de vraie valeur." },
        ],
    },
    {
        id: 9,
        title: "Analyser la Performance d'une Campagne Emailing",
        question: "Vous venez de lancer une campagne emailing. Quel KPI surveillez-vous en priorité pour évaluer son efficacité ?",
        correctAnswer: "B",
        options: [
        { id: "A", text: "Le taux d'ouverture", feedback: "Important, mais cela ne montre pas directement les conversions." },
        { id: "B", text: "Le taux de conversion", feedback: "Très bien ! Cela montre si la campagne atteint ses objectifs de vente ou d'engagement. " },
        { id: "C", text: "Le nombre de clics", feedback: "Utile, mais à analyser en complément d'autres indicateurs." },
        ],
    },
    {
        id: 10,
        title: "Créer un Persona Utilisateur",
        question: "Vous souhaitez créer un persona utilisateur pour mieux cibler votre audience. Quel élément est le plus important à inclure dans le persona ?",
        correctAnswer: "B",
        options: [
        { id: "A", text: "Le nom du persona", feedback: "Ce n'est pas essentiel. Concentrez-vous sur des informations plus pertinentes." },
        { id: "B", text: "Les besoins et motivations", feedback: "Très bien ! Cela aide à cibler les actions marketing et à répondre aux attentes des utilisateurs. " },
        { id: "C", text: "L'âge exact", feedback: "Utile, mais les besoins et motivations priment." },
        ],
    },
    {
        id: 11,
        title: "Lancer une Stratégie de Contenu Visuel",
        question: "Votre entreprise souhaite augmenter l'engagement sur les réseaux sociaux. Quel type de contenu visuel créez-vous pour maximiser les interactions ?",
        correctAnswer: "C",
        options: [
          { id: "A", text: "Infographies détaillées", feedback: "Utile, mais cela peut ne pas générer beaucoup d'interactions spontanées." },
          { id: "B", text: "Photos de produits", feedback: "Intéressant, mais cela manque de créativité." },
          { id: "C", text: "Vidéos courtes et engageantes", feedback: "Bonne réponse ! Les vidéos courtes sont très populaires et favorisent les interactions. " }
        ]
      },
      {
        id: 12,
        title: "Faire Face à une Baisse de Trafic Web",
        question: "Votre site web connaît une baisse de trafic importante. Quelle action mettez-vous en priorité ?",
        correctAnswer: "B",
        options: [
          { id: "A", text: "Lancer une campagne publicitaire payante", feedback: "Cela peut temporairement augmenter le trafic, mais ce n'est pas une solution durable." },
          { id: "B", text: "Optimiser le contenu pour le SEO", feedback: "Bonne réponse ! Une optimisation SEO peut améliorer le trafic organique à long terme. " },
          { id: "C", text: "Augmenter la fréquence des publications", feedback: "Utile, mais cela dépend de la qualité du contenu." }
        ]
      },
      {
        id: 13,
        title: "Créer une Newsletter Engagée",
        question: "Votre entreprise souhaite lancer une newsletter. Quelle stratégie utilisez-vous pour maximiser le taux d'ouverture ?",
        correctAnswer: "A",
        options: [
          { id: "A", text: "Personnaliser l'objet des emails", feedback: "Bonne réponse ! La personnalisation augmente le taux d'ouverture. " },
          { id: "B", text: "Envoyer des emails à toute la base de données", feedback: "Cela peut augmenter les désabonnements." },
          { id: "C", text: "Ajouter des images lourdes", feedback: "Attention ! Les images lourdes peuvent ralentir le chargement." }
        ]
      },
      {
        id: 14,
        title: "Gérer une Communauté en Ligne",
        question: "Votre entreprise veut améliorer la gestion de sa communauté en ligne. Quelle action mettez-vous en place ?",
        correctAnswer: "C",
        options: [
          { id: "A", text: "Modérer tous les commentaires", feedback: "Cela peut être utile, mais nécessite beaucoup de ressources." },
          { id: "B", text: "Automatiser les réponses", feedback: "Attention ! Les réponses automatisées peuvent sembler impersonnelles." },
          { id: "C", text: "Encourager les discussions constructives", feedback: "Bonne réponse ! Favoriser les discussions engage la communauté. " }
        ]
      },
      {
        id: 15,
        title: "Choisir un Canal de Communication",
        question: "Votre entreprise souhaite lancer une nouvelle campagne marketing. Quel canal privilégiez-vous pour toucher une audience jeune ?",
        correctAnswer: "B",
        options: [
          { id: "A", text: "Emailing", feedback: "L'emailing est efficace, mais il peut être moins pertinent pour une audience jeune." },
          { id: "B", text: "TikTok", feedback: "Bonne réponse ! TikTok est très populaire parmi les jeunes. " },
          { id: "C", text: "LinkedIn", feedback: "LinkedIn est plus adapté pour une audience professionnelle." }
        ]
      },
      {
        id: 16,
        title: "Lancer un Programme d'Ambassadeurs",
        question: "Vous souhaitez lancer un programme d'ambassadeurs pour votre marque. Quel type d'ambassadeurs choisissez-vous ?",
        correctAnswer: "A",
        options: [
          { id: "A", text: "Clients fidèles", feedback: "Bonne réponse ! Les clients fidèles sont authentiques et crédibles. " },
          { id: "B", text: "Célébrités", feedback: "Attention ! Les célébrités peuvent être coûteuses et moins authentiques." },
          { id: "C", text: "Collaborateurs internes", feedback: "Cela peut être utile, mais l'impact peut être limité." }
        ]
      },
      {
        id: 17,
        title: "Créer une Stratégie Mobile-First",
        question: "Votre site web doit être optimisé pour le mobile. Quelle action prioritaire mettez-vous en place ?",
        correctAnswer: "C",
        options: [
          { id: "A", text: "Réduire les images", feedback: "Utile, mais pas suffisant." },
          { id: "B", text: "Ajouter des vidéos autoplay", feedback: "Mauvaise idée ! Cela peut ralentir le chargement." },
          { id: "C", text: "Améliorer la vitesse de chargement", feedback: "Bonne réponse ! La vitesse de chargement est cruciale pour l'expérience mobile. " }
        ]
      },
      {
        id: 18,
        title: "Augmenter les Avis Clients Positifs",
        question: "Votre entreprise souhaite augmenter le nombre d'avis clients positifs en ligne. Quelle stratégie utilisez-vous ?",
        correctAnswer: "B",
        options: [
          { id: "A", text: "Offrir des réductions pour chaque avis", feedback: "Attention ! Cela peut sembler non éthique." },
          { id: "B", text: "Encourager les clients satisfaits à laisser un avis", feedback: "Bonne réponse ! Cela permet d'obtenir des avis authentiques. " },
          { id: "C", text: "Supprimer les avis négatifs", feedback: "Cela peut nuire à la crédibilité de votre marque." }
        ]
      },
      {
        id: 19,
        title: "Analyser une Campagne de Remarketing",
        question: "Vous avez lancé une campagne de remarketing. Quel indicateur surveillez-vous en priorité ?",
        correctAnswer: "A",
        options: [
          { id: "A", text: "Le taux de conversion", feedback: "Bonne réponse ! Le taux de conversion est crucial pour mesurer l'efficacité du remarketing. " },
          { id: "B", text: "Le taux d'ouverture des emails", feedback: "Important, mais pas le plus pertinent pour le remarketing." },
          { id: "C", text: "Le nombre de likes sur les posts", feedback: "Cela peut être utile, mais ce n'est pas un indicateur clé pour le remarketing." }
        ]
      },
      {
        id: 20,
        title: "Optimiser une Stratégie d'Emailing",
        question: "Votre taux de clics sur les emails est faible. Quelle action prenez-vous pour l'améliorer ?",
        correctAnswer: "C",
        options: [
          { id: "A", text: "Augmenter le nombre d'emails envoyés", feedback: "Cela peut fatiguer vos abonnés." },
          { id: "B", text: "Ajouter des images lourdes", feedback: "Attention ! Cela peut ralentir le chargement." },
          { id: "C", text: "Personnaliser le contenu des emails", feedback: "Bonne réponse ! La personnalisation augmente l'engagement. " }
        ]
      }
] 