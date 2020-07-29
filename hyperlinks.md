<h3>Categories</h3>

[Functional Programming](#functional-programming) |
[React](#react) |
[Testing](#testing)

<hr>

### What is Software?

- [Rails Conf 2012 Keynote: Simplicity Matters by Rich Hickey](https://www.youtube.com/watch?v=rI8tNMsozo0)

  No Clojure experience required. But open to a deep dive into what software "simplicity" really means and into the hazardous semantic mistakes we constantly make with terms like "simple," "easy," "complex," "hard," when discussing our software preferences. 

- [From complicated to complex](https://blog.jessitron.com/2019/09/26/from-complicated-to-complex/)

  Being precise with our language when *describing* software is really helpful to maintain a steady notion of the world we are working in. "Complicated" and "complex" may first appear as interchangeable terms, but the distinction jessitron offers contours a really helpful boundary for categorizing different types of big software systems; and thereby encourging us to conscript more correct approaches to understanding and managing constructing them.

- [Instructive and Persuasive Examples](https://www.hillelwayne.com/post/persuasive-examples/)  
  
  Why is so much writing about code so unhelpful? Here's one insightful investigation as to why.

### State Machines

- [David Khourshid: Simplifying Complex UIs with Finite Automata & Statecharts:  JSConf Iceland 2018](https://www.youtube.com/watch?v=RqTxtOXcv8Y)

  This was my initial intro into finite state automata in UI and marks a somewhat profound evolution in my thinking around getting a handle on complex UI state for web clients.

### Functional Programming

- [Procedures, Functions, Data](https://www.brandonsmith.ninja/blog/procedures-functions-data)

  Outside of Eric Normand's [still in progress book] _Grokking Simplicity_ this is, sadly and shockingly, the _only_ other accessible example of utilizing functional programming concepts in real-world JavaScript code I've found. Mr. Smith leads you step-by-step from procedural (read: imperative) syntax to functional; thus achieving an example of what Hillel Wayne calls a ["persuasive"](https://www.hillelwayne.com/post/persuasive-examples/) (vs "instrucive"): a more difficult, but helpful kind.

- [Execution in the Kingdom of Nouns ](https://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html)

  The classic OO/Java burn. OO vs functional is never the right debate, but I swear it can be instructional to consider the manner in which these two paradigms map (simplistically) to the grammatical opposition of Noun vs Verb. I don't think software will ever escape linguistic and textual comparisons (ie *software is writing*). It's a kind of writing, and I bet your (more functional-style) transaction sequences in JavaScript are very verb-y:
    ```js
      arr
        .transform
        .select
        .flatten
        .doAnotherThing
    ```

### React

- [React Patterns](https://reactpatterns.com/)

  It's like the Gang of Four but for React, and written with less an air of thought-leadery importance. I wrote React for almost two years without finding this site and I feel great _saudade_ for that time.

### Testing

- [Testing Implementation Details](<(https://kentcdodds.com/blog/testing-implementation-details)>)

  > ["The more your tests resemble the way your software is used, the more confidence they can give you."](https://twitter.com/kentcdodds/status/977018512689455106)

  Developing this instinct really takes time. But this article from Kent is an erudite praxis to help you wrangle your test code to focus on the end user experience. It's also effectively an advertisement for principles that drove the design of React Testing Library, and how it saves you from the kind of gunfooting allowed by Enzyme. A great companion piece to [Avoid the Test User](https://kentcdodds.com/blog/avoid-the-test-user).
