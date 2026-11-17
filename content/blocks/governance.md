The arrangements on this page are drawn from the Global Trade Commons charter, which is a draft for
circulation to prospective founding participants, UN/CEFACT and its UNECE secretariat, the Global
Digital Collaboration and prospective multilateral development bank partners. It has not been
executed, and nothing here should be read as a commitment of a foundation that does not yet exist.

Two things on this page have moved on from that draft, and the charter is being revised to match.
The charter has the Commons constituted directly as a foundation under a permanent international
host, where the present intention is to begin with a lighter arrangement and decide the permanent
home later. The charter also seats UN/CEFACT and the Global Digital Collaboration on the Governing
Board, and neither now holds a seat. Until the charter is revised, this page is the current statement
on the institutional home and on the composition of the Board, and the charter remains the source of
truth on everything else.

UN/CEFACT holding no seat changes nothing about where normative authority rests or about how the
Commons routes a specification defect upstream. Both are set out below and neither depends on a seat.

## Institutional home

Governance starts light, and the first arrangement is explicitly temporary.

**Initially, a project hosted by the Linux Foundation.** This gives the Commons a neutral home for the
code and the trademark, an established governance template, and the means to receive contributions and
contract for work from the outset, without first standing up a foundation of its own. It is a starting
position and not a destination. The alternative is to hold no funds at all, or to wait a year for a
permanent structure before any work can be funded.

**The permanent home is not yet decided.** Two routes are under consideration:

- A full Linux Foundation sub-foundation, in the manner of the established sectoral foundations
  hosted there, with its own governing board and its own technical oversight.
- A sub-foundation of the International Organisation for Digital Commons (IODC), which the Global
  Digital Collaboration (GDC) establishes and which is expected to be established under Swiss
  foundation law. The IODC provides shared central services to the entities constituted under it:
  legal, banking, accounting and audit, employment and payroll, contracting, insurance and
  compliance, so the full institutional machinery gets built once and every entity under it reuses
  that machinery.

The choice is deferred, not left open. It turns largely on which host can accept the kinds of funding
the Commons expects. Membership dues from companies and grants from governments and development banks
are different financial instruments, with different requirements on the recipient's legal character,
and a structure that suits one does not automatically suit the other.

Whichever host is chosen has to satisfy two conditions. The constraint against distributing any
surplus must hold because of what the host is, not because the Commons has undertaken to observe it.
A Swiss foundation satisfies that, because it has no members or shareholders and irrevocably
dedicates its assets to its stated purpose under the supervision of the competent foundation
authority. The second
condition is that the Commons can leave, which continuity and portability below deals with.

## Where normative authority rests

UN/CEFACT retains sole normative authority over its specification suite, including the reference
vocabularies, UNTP, UNVTD and the Global Trust Registry. The Commons is the implementation and
adoption arm and holds no normative authority.

Two bodies are frequently conflated and should not be. UN/CEFACT is the intergovernmental standards
body that owns and governs the specifications. UNECE is the United Nations entity that hosts the
UN/CEFACT secretariat, provides its legal and administrative home, and receives voluntary
contributions in support of it. Normative matters rest with UN/CEFACT; the secretariat host and
contribution recipient is UNECE.

Where implementation work identifies a defect, a gap or an improvement in a specification, the
Commons routes it to the governing body through that body's established change-request and
working-group processes, and does not resolve it unilaterally. Where a specification is silent or
ambiguous, the Commons records the interpretation it adopted and refers the question upstream.

## Governing Board

Governance is deliberately lean. A founding Governing Board provides strategic direction and
oversight, approves the annual programme of work, and oversees the use of pooled funds at programme
level.

Seats for founding organisations are drawn from four classes, so that no single kind of participant
can set the direction on its own:

- **Technology corporates.** Software vendors, platform operators and supply-chain technology
  providers, including those that sell products competing with components the Commons holds.
- **Government agencies.** Customs administrations, trade and industry departments, and regulators.
- **Industry membership organisations.** Sector bodies and responsible-sourcing schemes that set
  criteria their members report against, and whose conformity vocabularies the work depends on.
- **Civil society.** Environmental and labour organisations with a direct interest in whether
  transparency claims can be checked.

One elected implementation and community representative also sits on the Board.

The Board may additionally offer liaison seats to intergovernmental organisations. A liaison seat
carries no vote and no contribution, so an organisation that cannot pay a membership fee, or cannot
be seen to vote on the direction of a body it also deals with as a counterpart, can still follow the
work and be heard on it. The seats are optional in both directions: the Board is not obliged to offer
one and no organisation is expected to take one. Which organisations hold them is left open until
there is something concrete to invite them to.

The Board elects a Chair, and a Vice-Chair for continuity, for a fixed term of twelve months
renewable once, so the role rotates to another organisation after a maximum of two consecutive years.
The Chair convenes meetings, sets the agenda in consultation with members and represents the Commons
externally. The role is one of facilitation. It carries no casting vote and no veto, and it is tied
to no contribution level.

## Technical governance

Technical direction is open and contribution-based, following established open-source practice.
Decisions on the test harnesses, reference implementations and registries rest with the active
contributors and maintainers.

**Financial contribution does not purchase a governance seat or a technical decision right.** The
founding Board seats held by founding organisations derive from their role in establishing the
Commons, not from the size of any contribution, and public bodies participate regardless of whether
they contribute at all. Contributions may be earmarked at programme level, never at the level of a
specific feature for a specific contributor, because feature-specific funding directed to a
contributor's own benefit begins to resemble procurement.

## Registers as public goods

The authoritative registers the ecosystem relies on, both the trust and identity registers and the
conformance and implementation register, are UN/CEFACT public goods with their legal and
administrative home in the UNECE secretariat. UN/CEFACT holds the namespace, the rules, the data, and
the right to appoint or replace the operator.

The Commons populates them and may operate them under revocable, non-exclusive delegation. The
register data is open, and the interface for submitting verified conformance results is
non-exclusive, so being recorded on a register is never conditional on the Commons being the sole
route. This keeps registration a neutral public good and prevents the foundation from becoming a
gatekeeper.

## Continuity and portability

The work is structured so that it can always be forked and continued. Copyright stays distributed
among contributors under irrevocable open licences, so no host holds a lock on the commons.

Because the first host is temporary, portability has to cover the planned move and not only a
hypothetical fork. Distributed copyright under the Developer Certificate of Origin protects the code
whatever happens to the institution. It does not protect the name or the accumulated funds, and a
host that holds a project's trademark holds something no licence covers. So the terms of departure,
meaning trademark assignment and the treatment of unspent contributions, get settled when the Commons
joins, not when it wants to leave. Nobody negotiates a good exit from inside an arrangement that has
started to feel permanent.

The consequence is architectural as well as legal. **No component may depend on infrastructure only
the Commons can provide.** Every service must be deployable by a third party
from its own repository, and a hosted instance must be one deployment of a thing anyone can run.
Where an operator's configuration is sensitive, as a customs administration's risk rules are and
often classified, that operator must be able to run the software without the Commons ever seeing the
configuration or the data.

## Funding

The Commons is funded by voluntary contributions into a ring-fenced fund, held during the interim
arrangement by the host and thereafter by the permanent entity. It operates on a not-for-profit
basis, and no contributor acquires ownership of, or exclusive rights over, the infrastructure the fund
produces.

Contributions are voluntary support for shared public-good infrastructure, not procurement of
deliverables. The pooled, no-single-owner structure is what makes that characterisation defensible.
Where several governments, several companies and the standards community all contribute to a fund
producing open infrastructure that no contributor owns, the expenditure reads as support for a
commons and not as acquisition from a favoured supplier. Whether a particular
contribution is permissible under a jurisdiction's public-finance rules is a matter for that
contributor to confirm under its own rules, and the Commons asserts eligibility on nobody's behalf.

**Participation does not depend on paying.** Government agencies, academic institutions, non-profit
organisations and civil society organisations participate at no cost. A customs administration that
implements the work, or a civil society organisation that tests whether a transparency claim holds up,
contributes something the Commons needs and cannot buy. The same applies to a sector body or
responsible-sourcing scheme whose criteria the work depends on.

Contribution levels for commercial participants are not published here. The Governing Board sets them
once it is constituted, and until then they are a matter for direct conversation, because the amounts
depend on the host arrangement and on what the first programme of work costs. Whatever they turn out
to be, no level purchases a governance seat or a technical decision right.

Multilateral development banks and other international organisations are welcome, consistent with
the priority given to lowering adoption barriers for developing and emerging economies. Two routes
are open to them and an organisation takes one or the other. It can contribute and hold membership on
the same terms as any other funder, or it can take a liaison seat, which carries no contribution and
no vote. Which route suits a given organisation depends on its own mandate and on whether voting on
the direction of this body is compatible with how it deals with the Commons elsewhere.

The Commons may make voluntary contributions, received by UNECE as the secretariat host, in support
of the UN/CEFACT secretariat and its standards-maintenance function, because sustained implementation
depends on sustained maintenance of the specifications. Such a contribution is a grant in furtherance
of the Commons' own mission. It is not payment for the specifications, which remain UN/CEFACT
intellectual property, and it purchases no influence over normative content, no priority in the
standards process and no preferential treatment.
