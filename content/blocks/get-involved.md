## Contribute code

Work happens in the open on GitHub. Pick a component from the catalogue, read its repository's
contribution guide, and open an issue before a large change so the approach can be discussed before
the work is done.

Every commit is signed off with `git commit -s`, which certifies the
[Developer Certificate of Origin](https://developercertificate.org/): that you wrote the contribution
or have the right to submit it under the repository's licence.

**Your copyright stays yours.** Inbound equals outbound, so a contribution is licensed to everyone on
the same terms the repository already uses, and no party, the foundation included, may relicense it.
There is no contributor licence agreement and there will not be one. Aggregating copyright in a
single party is what would let a future host lock the commons, and it also deters the casual
contribution the Commons wants.

Code is Apache-2.0, for the express patent grant and defensive termination that matter when competing
vendors contribute to shared infrastructure in a standards context. A permissive licence without a
patent provision leaves exactly the uncertainty that stops a vendor donating a product it also sells.

## Contribute a component

A component is added to the catalogue by a pull request against one file, which is a light governance
gate in the right place: the entry is where somebody states who is accountable when the component
breaks. An entry records where the component lives, which tier it belongs to, how mature it is, which
standards it serves, whether the Commons operates a hosted instance, and who maintains it.

A component does not have to move into this organisation to be listed. The catalogue spans four
homes, and a vendor maintaining its own supported integration is the intended outcome rather than a
problem, so long as the catalogue records which state each component is in. A community demonstration
and a vendor-supported product are very different promises, and the catalogue should not blur them.

## Publish as a community

A community, meaning a sector or jurisdiction programme, owns its own content. The Commons supplies
the format, the template and the validator. Consultants can help produce the artefacts and the
programme owns them.

| Artefact | Where it lives | What reads it |
|---|---|---|
| Extension schema and JSON-LD context | The programme's own infrastructure | The issuing application, validators |
| Overlay shape graph | The programme's own infrastructure | The verifier |
| Profile at `.well-known/untp-cap-profile.json` | The programme's own domain | The issuing application, the register |
| Register entry | The UN/CEFACT Community Activation Plan register | Discovery for all of the above |

The register already carries several programmes, each declaring the extension it owns, the UNTP
version it extends and the identifier schemes it uses. What is mostly missing is the profile document
the register points at, which at the time of writing is largely not served. The gap is content rather
than mechanism, and an engine built before any declaration exists has nothing to read.

If writing a shape graph looks like specialist work, that is because it is. Whether a community can
realistically author these artefacts even with consulting support is an open question, and if the
answer turns out to be no, the Commons needs authoring tooling as much as it needs the engines that
read the output.

## Fund the work

The Commons is funded by voluntary contributions into a ring-fenced fund. Governments, multilateral
development banks, international organisations and companies are all welcome, and a government agency
participates on equal terms whether or not it contributes financially. No contribution at any level
purchases a governance seat or a technical decision right. See
[Governance](/governance) for how contribution and control are kept apart.

## Talk to someone

The mailing list and chat channel are shared with the UN/CEFACT UNTP community, which is where most
implementation discussion happens today. For anything specific to a component, an issue on its
repository reaches the people who maintain it.
