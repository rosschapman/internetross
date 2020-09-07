<h3>Categories</h3>

[What is Software](#what-is-software) |
[State Machines](#state-machines) |
[Functional Programming](#functional-programming) |
[React](#react) |
[Testing](#testing)

<hr>

### What is Software?

- [Rails Conf 2012 Keynote: Simplicity Matters by Rich Hickey](https://www.youtube.com/watch?v=rI8tNMsozo0)

  No Clojure experience actually required for this deep dive into what software "simplicity" really means and the hazardous semantic mistakes we constantly make with terms like "simple," "easy," "complex," "hard," when discussing our software preferences.

- [From complicated to complex](https://blog.jessitron.com/2019/09/26/from-complicated-to-complex/)

  Being precise with our language when _describing_ software is key to maintaining a steady notion of the world we are working in. "Complicated" and "complex" may first appear isomorphic, but the distinction jessitron offers contours a necessary taxonomic boundary for types of big software systems; and thereby encourges us to conscript more correct approaches to understanding and constructing software systems.

- [Instructive and Persuasive Examples](https://www.hillelwayne.com/post/persuasive-examples/)

  Why is so much writing about code so unhelpful? Here's one insightful investigation as to why.

### Error Handling

- [Michael Feathers - Edge-Free Programing](https://www.youtube.com/watch?v=vbLyfh6QdI0)

  Explorations of program interruptions -- logging, exceptions -- that Feathers terms "edges" and Haskell-inspired strategies for mitigation. Mainly, how do we discover and handle invalid input at the farthest boundaies in our application in order that we can feel free to parse and process and data confidently deeper down. In other words, pushing edges to the edge. Beware production code examples in Java and Ruby.

### State Machines

- [David Khourshid: Simplifying Complex UIs with Finite Automata & Statecharts: JSConf Iceland 2018](https://www.youtube.com/watch?v=RqTxtOXcv8Y)

  This was my initial intro into finite state automata in UI, thus marking a non-trivial evolution in my thinking for getting a handle on complex UI state for web clients.

### Functional Programming

- [Procedures, Functions, Data](https://www.brandonsmith.ninja/blog/procedures-functions-data)

  Outside of Eric Normand's [still in progress book] _Grokking Simplicity_ this is, sadly and shockingly, the _only_ other accessible example of utilizing functional programming concepts in real-world JavaScript code I've found. Mr. Smith leads you step-by-step from procedural (read: imperative) syntax to functional; thus achieving an example of what Hillel Wayne calls a ["persuasive"](https://www.hillelwayne.com/post/persuasive-examples/) (vs "instrucive"): a more difficult, but helpful kind.

- [Execution in the Kingdom of Nouns ](https://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html)

  The classic OO/Java burn. OO vs functional is never the right debate, but I swear it can be instructional to consider the manner in which these two paradigms map (simplistically) to the grammatical opposition of Noun vs Verb. I don't think software will ever escape linguistic and textual comparisons (ie _software is writing_). It's a kind of writing, and I bet your (more functional-style) transaction sequences in JavaScript are very verb-y:

  ```js
  arr.transform.select.flatten.doAnotherThing
  ```

### React

- [React Patterns](https://reactpatterns.com/)

  It's like the Gang of Four but for React, and written with less an air of thought-leadery importance. I wrote React for almost two years without finding this site and I el great _saudade_ for that time.

### Testing

- [Testing Implementation Details](<(https://kentcdodds.com/blog/testing-implementation-details)>)

  > ["The more your tests resemble the way your software is used, the more confidence they can give you."](https://twitter.com/kentcdodds/status/977018512689455106)

  Developing this instinct really takes time. But this article from Kent is an erudite praxis to help you wrangle your test code to focus on the end user experience. It's also effectively an advertisement for principles that drove the design of React Testing Library, and how it saves you from the kind of gunfooting allowed by Enzyme. A great companion piece to [Avoid the Test User](https://kentcdodds.com/blog/avoid-the-test-user).

### Typing

- [Types as axioms, or: playing god with static types](https://lexi-lambda.github.io/blog/2020/08/13/types-as-axioms-or-playing-god-with-static-types/)

This is a good one for TypeScript developers who normally think about typing as a way of applying _constraints_. As King notes, TS influences this since the language intends for you to apply annotations alongside dynamically typed JS. But what if we thought about types another way: not as constraints, but as _axiom schemas_. King invites us to shift from a predictive to a constructive approach. Considering a [similar post](https://www.hillelwayne.com/post/constructive/) from Hillel Wayne, this post feels squarely located in the software scholarship domain that cheers the data modeling as a skill to be cultivated.
