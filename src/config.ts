const config = {
  name: 'Global Trade Commons',
  shortName: 'Trade Commons',

  // TODO: replace with the foundation's own address once it is constituted and has one.
  contactEmail: '',

  mailingList: 'https://gaggle.email/join/untp@gaggle.email',
  chatChannel:
    'https://join.slack.com/t/uncefact/shared_invite/zt-36yan5ezl-gFgWgckgKlZ5lIR4m_lVWg',
  github: 'https://github.com/trade-commons',

  // Shown in the header and on the home page. Removed once the charter is executed.
  formingNotice:
    'The Global Trade Commons is forming. The charter is a draft for circulation and has not ' +
    'been executed.',

  pages: {
    home: {
      title: 'Global Trade Commons',
      description:
        'A neutral home for the shared tools, tests, reference implementations and registries ' +
        'that make the UN/CEFACT digital trade standards, and the open standards they build on, ' +
        'usable in practice.',
    },
    about: {
      title: 'About the Commons',
      description:
        'What the Global Trade Commons does and does not do, who governs the standards it ' +
        'implements, and the principle that keeps it from becoming the bottleneck for every ' +
        'adoption.',
    },
    governance: {
      title: 'Governance',
      description:
        'How the Global Trade Commons is constituted, where normative authority rests, and the ' +
        'arrangements that keep the commons portable.',
    },
    components: {
      title: 'Components',
      description:
        'The component catalogue: what exists, where it lives, how mature it is, which standards ' +
        'it serves and who maintains it.',
    },
    registers: {
      title: 'Registers',
      description:
        'The registers the ecosystem relies on: what each one registers, where it resides, and why '
        + 'none of them belong to the Global Trade Commons.',
    },
    getInvolved: {
      title: 'Get Involved',
      description:
        'How to contribute to the Global Trade Commons, what the Developer Certificate of Origin ' +
        'means for your copyright, and what a community publishes for itself.',
    },
  },
};

export default config;
