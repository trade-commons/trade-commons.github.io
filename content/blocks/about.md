The Global Trade Commons exists to make open, verifiable digital trade infrastructure usable in
practice. It is a neutral, multi-stakeholder home for the shared tools, tests, reference
implementations and registries that the UN/CEFACT digital trade standards, and the open standards they
build on, need before anyone can adopt them. Publishing a specification is not the same as making it
usable, and the gap between the two is what this work closes.

Particular attention goes to lowering adoption barriers for developing and emerging economies, so
that the benefits of open digital trade infrastructure reach the economies that would otherwise be
left behind.

## What is in scope

- Conformance and interoperability test harnesses for the UN/CEFACT digital trade suite, principally
  the UN Transparency Protocol (UNTP) and UN Verifiable Trade Documents (UNVTD), and for the open
  standards they build on.
- Reference implementations and shared tooling that lower the cost of adoption.
- Operating or supporting common registries and interoperability infrastructure as public goods.
- Documentation, guidance, worked examples and onboarding material for implementers.
- Adoption programmes, community activation and ecosystem coordination.
- Capacity building for developing and emerging economies.
- Fee-for-service conformity testing and registration, operated on a cost-recovery, open and
  non-discriminatory basis.

## What is out of scope

Authorship or amendment of the normative specifications. UN/CEFACT owns and governs UNTP, UNVTD, the
reference vocabularies and the Global Registry Information Directory, with its secretariat hosted by
the United Nations Economic Commission for Europe (UNECE). The World Customs Organization governs the
WCO Data Model. The World Wide Web Consortium (W3C) governs the Verifiable Credentials and
Decentralised Identifiers specifications. The Commons implements standards governed by others, holds
no normative authority over any of them, authors none of them, and coordinates with each through
liaison on the same terms.

Any activity that would grant a contributor ownership of, or exclusive rights over, the common
infrastructure is also out of scope.

## Rules about specifications

Delivery pressure is what breaks these, so they are written down.

**Nothing forks a specification, whoever owns it.** Schemas, contexts, vocabularies and registers are
referenced at their published location, never copied in. The failure this avoids is a widely used
community implementation becoming the de facto specification, after which there are two standards and
the normative one is the less used.

**A body's machine-readable artefacts belong at that body.** A vocabulary published as resolvable
linked data is the standard in another serialisation, carrying the same authority, and it belongs on
the body's own domain under its own identifiers. Prototyping one to make the case for publishing it is
legitimate on conditions: name the destination at the outset, keep identifier minting configurable so
nothing has to be rewritten at handover, and retain no operating role afterwards. Without a recipient
named in advance, nobody takes the prototype over and nobody retires it.

**Register authority is never the foundation's.** The authoritative trust, identity, conformance and
implementation registers are UN/CEFACT public goods. The Commons may operate one under revocable,
non-exclusive delegation, and may hold the code that serves a register and the configuration that
operates it. It never holds the data as its own asset. The Commons offers every other body the same terms,
because granting one exception creates the precedent for the next request.

## The organising principle

The Commons builds engines. Standards bodies and communities publish the declarations those engines
consume.

Engines are few, generic and maintained centrally. Declarations are many, specific, and maintained by
whoever owns the domain they describe. An Australian livestock passport differs from a Brazilian
coffee passport in its schema extension, its identifier schemes, its validation rules and its
vocabulary, and in none of its software.

Any other structure breaks at the scale this work is heading for. Code maintained per sector per
jurisdiction makes the Commons the bottleneck for every adoption, and no funded team is large enough
for that. So the formats matter more than the code. An engine can be rewritten in a year. A format
with a hundred published instances cannot.

Every engine must therefore work with no community declaration at all, producing a correct if
unpolished result, and improve as declarations arrive. Without that property an application cannot
ship until the first community acts, and every community waits on the Commons.

## Where things live

Four kinds of home, and four different answers to who is accountable when something breaks. The
component catalogue spans all four, so an entry on it often points somewhere other than this
organisation.

| Home | Holds | Accountable |
|---|---|---|
| A standards body's own infrastructure | Normative specifications and their registers. UNICC GitLab for UN/CEFACT, the WCO for the Data Model, the W3C for the credential and identifier specifications | That body's process and members |
| The Global Trade Commons | Implementations, tooling, operated services and adoption material | The foundation, as a funded entity that can hold an obligation |
| A community's own infrastructure | Its extension, its overlay rules, its profile | That community |
| A vendor's own repositories | Its supported connectors and products | The vendor |

## Why the name

The Commons is named for a commons and not for any single standard, so that a government agency, a
standards body or a commercial organisation can support open digital trade infrastructure without
appearing to fund one standards owner through a proxy. The work already spans more than one body.
Customs implementation depends on artefacts governed by UN/CEFACT and by the WCO and authored by
neither, which makes customs administrations, the WCO and UN/CEFACT all constituencies of the same
organisation.

The UNECE secretariat that hosts UN/CEFACT carries a regional name, but UN/CEFACT is a worldwide
standards body. The Commons is open on equal terms to governments, standards bodies and organisations
from every region, and is not a European undertaking.
