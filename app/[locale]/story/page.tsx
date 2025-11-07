import { getTranslations } from 'next-intl/server';

export default async function StoryPage() {
  const t = await getTranslations('story');

  // Timeline events extracted from CV - chronological order (recent first)
  const timelineEvents = [
    {
      date: '2024',
      period: '2024 - heden',
      title: 'Laatstejaar Bachelor',
      category: 'education',
      description: 'Afstudeerproject en laatste vakken Bachelor Toegepaste Informatica aan AP Hogeschool.',
      tags: ['AP Hogeschool', 'Mixed Reality', 'Web Development']
    },
    {
      date: '2021',
      period: '2021 - heden',
      title: 'Bachelor Toegepaste Informatica',
      category: 'education',
      description: 'Minor: Mixed Reality / Immersive Storytelling. Focus op Web Development en Software Engineering met grote interesse naar alle vormen van generatieve AI.',
      tags: ['AP Hogeschool', 'HTML5', 'CSS', 'JavaScript', 'SQL', 'Java', 'C#', 'Python']
    },
    {
      date: '2021',
      period: '2021 - 2022',
      title: 'Alternate - Computer Assemblage',
      category: 'work',
      description: 'Stage gevolgd door vakantiewerk. Technische dienst en computer assemblage.',
      tags: ['Hardware', 'Technical Support']
    },
    {
      date: '2020',
      period: '23 - 28 augustus 2020',
      title: 'Brantano - Interim',
      category: 'work',
      description: 'Interim voor AGO tijdens grote uitverkoop periode. Rekken bijvullen en verhoogde hoeveelheid klanten opvangen.',
      tags: ['Retail', 'Customer Service']
    },
    {
      date: '2019',
      period: '2019 - 2021',
      title: 'GO! Atheneum Boom',
      category: 'education',
      description: 'Middelbaar onderwijs met specialisatie in informaticabeheer.',
      tags: ['Middelbaar', 'Informaticabeheer']
    },
    {
      date: '2018',
      period: '2018 - 2020',
      title: 'JumpUniverz',
      category: 'work',
      description: 'Student job als kassier, cafetaria medewerker, en instructeur/opzichter op het trampolineveld.',
      tags: ['Student Job', 'Customer Service', 'Instructor']
    },
    {
      date: '2018',
      period: 'januari - maart 2018',
      title: 'EHBO Certificaat',
      category: 'certification',
      description: 'Cursus EHBO bij Het Rode Kruis. Basis levensreddende handelingen en eerstehulpverlening.',
      tags: ['EHBO', 'Het Rode Kruis', 'First Aid']
    },
    {
      date: '2015',
      period: '2015 - heden',
      title: 'YUM - Zaakvoerder & Webontwikkelaar',
      category: 'entrepreneurship',
      description: 'Zaakvoerder van familiebedrijf gespecialiseerd in superfoods (empoweredbyyum.com). Verantwoordelijk voor website design, visuals, contentbeheer, Google Ads, en communicatie met leveranciers en klanten.',
      tags: ['Entrepreneurship', 'WordPress', 'Squarespace', 'E-commerce', 'Google Ads']
    },
    {
      date: '2014',
      period: '2014',
      title: 'Cursus Blindtypen',
      category: 'skill',
      description: 'Typeplanet cursus afgerond met 136 apm. Nu gestegen naar 360+ apm.',
      tags: ['Touch Typing', 'Productivity']
    },
    {
      date: '2010',
      period: 'Lagere school',
      title: 'CoderDojo',
      category: 'education',
      description: 'Al vanaf de lagere school naar CoderDojo\'s gegaan - een geweldig initiatief voor kinderen om hun eerste stappen in de developer wereld te zetten.',
      tags: ['CoderDojo', 'Programming', 'Early Start']
    }
  ];

  return (
    <div className="min-h-screen py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-16 text-center">
          <span className="bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[rgb(var(--color-primary))] via-[rgb(var(--color-accent))] to-[rgb(var(--color-secondary))] opacity-30" />

          {/* Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative pl-24">
                {/* Date marker */}
                <div className="absolute left-0 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{event.date}</span>
                  </div>
                </div>

                {/* Content card */}
                <div className="glass-strong rounded-2xl p-6 border border-[rgba(var(--color-primary)/0.2)] hover:border-[rgba(var(--color-primary)/0.4)] transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                      {event.title}
                    </h3>
                    <span className="text-sm text-[rgb(var(--text-muted))] whitespace-nowrap ml-4">
                      {event.period}
                    </span>
                  </div>

                  <p className="text-[rgb(var(--text-light))] mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full bg-[rgba(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))] text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
