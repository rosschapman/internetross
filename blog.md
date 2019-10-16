<style type="text/css">
/* https://github.com/lonekorean/gist-syntax-themes */
@import url('https://cdn.rawgit.com/lonekorean/gist-syntax-themes/848d6580/stylesheets/monokai.css');

@import url('https://fonts.googleapis.com/css?family=Open+Sans');
.markdown-body table tr {
    background-color: inherit;
    border-top: inherit;
}
.markdown-body table tr:nth-child(2n) {
   background-color: inherit;
}
.markdown-body table tr:hover {
    background: black
}
.markdown-body table th, .markdown-body table td {
    padding: 6px 13px;
    border: inherit;
}
.gist .blob-num:hover {
    color: inherit;
}
</style>

### Harmful ways to write about software
##### 10/10/2019

*Dispatch from Soekarno-Hatta International Airport.*
*Arrived way too early because of traffic fantasies.*

While leafing through my daily software briefs I came across an article with that dissapointing refrain in our industry: *this should be easy to do*. There's probably no better way to put a reader on the defensive and create an adversarial teaching situation. Suddenly I'm challenged to match the author's intellectual prowess or else remain befuddled and continue writing shitty code. Why you fuckin with my head???

The article is another offering to the OO world which introduces the dependency indirection "injectable factory" design pattern as a cure for "rigid direct dependencies" in unit tests. Super simple stuff.

Also just LOL the indexical disambiguation science of the OO world; fucking riveting. A true [kingdom of nouns](https://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html).

I think the article is just a way of instructing the use of mocks without dependency injection, helping you avoid writing a service implementation for your tests that looks like this: 

```java
public class OrderServiceImpl implement OrderService {
  private final ShoppingCartService cartService;
  private final PricingService pricingService;
  private final InventoryService inventoryService;
  private final UserSession userSession;
  private final TimeProvider timeProvider;
  // ... and many more, this list will keep increasing when more requirements added
  
  public OrderService(
      ShoppingCartService cartService, 
      PricingService pricingService, 
      InventoryService inventoryService, 
      UserSession userSession,
      TimeProvider timeProvider) {
    this.cartService = cartService;
    this.pricingService = pricingService;
    // .... 
  }
  
  public CreateOrderResponse createOrder(CreateOrderRequest req) {
    // ...
  }
}
```

Ah yeah that looks hairy. I'm flashing to JavaScript files with dozens of `import` statements. 

I remember a moment, a phase if you will, in my first couple of years working professionally as a softwhere engineer when I thought that understanding OO design patterns was part of our right of passage into...seniority, I guess? At the time I was beginning to write more in the Rails parts of our codebase and as a consequence, began inheriting a pressure, a notion -- from where I'm not sure -- to achieve familiarity with common OO design patterns.

From where, indeed. It's really subtle how this worldview is propogated amongst our ilk but I think I'm starting to see, with clear eyes, the quiet, viral expansion. 

For example, this digesis about "injectable factory" thats got me irked. When the author completes the situation and complication setup, he begins his solution section with: 

> The pattern is pretty simple.

Umm great, so what you're proposing is just a fancy name for something I probably already know about? But then: 

> It’s implemented as a mutable value holder. This pattern is related to the factory, service locator, singleton pattern and ambient context pattern. All these patterns are considered anti-patterns according to most DI articles. But in practice, those patterns, especially singleton, are very handy and useful. They are prevalent in almost every non-trivial project. But they come with caveats. InjectableFactory tries to prevent those caveats at the same time keep the convenience and simplicity of those patterns.

It's so simple I just need to have a solid undertanding of these (what must be other simple) concepts as well:

1. dependency injection
1. a value holder (probably Java slang for some kind of variable?)    
1. mutable value holder    
1. factory pattern    
1. service locater pattern    
1. singleton pattern    
1. ambient context pattern    

I'm reminded of Rich Hickey's 2012 Rails Conf [talk](https://www.youtube.com/watch?v=rI8tNMsozo0) where he disambiguates *simple* from *easy* which are often used interchangeably. This linguistic casuality creates confusion about how we might truly achieve better software. Hickey recoups a specificity for each word through an etymological tracing. Simple is objective. Easy is relativistic. 

Our Javian knight probably means *easy*, which Hickey relates to a spacial relativism of *nearness*. As in *easy to go to or get* or near to our understanding. In other words *familiar*. Like a better developer experience:

> ...can I get this instantly and start running it in five seconds?

But he probably also means *"being near to our capabilities"*, the promise of easy.

Even if the usage intent is closer to Hickey's *easy*, what about this list of like seven things I need to know that may not be near my capabilities? Like, easy for whom? What type of reader is summoned here? Since the author never names his imagined reader/audience we'll never know for sure, but we can infer it's likely folks who are experts in OO and the Java lang. Perhaps that's the transgression that bothers me. This invocation of *simple* to self anoint as meister amongst a court of meisters, but without warning patronizingly forecloses access for an unitiatied reader. I think this is the gatekeeping emerging, infectiously. Almost too quickly to observe. I'm really glad Hickey also finds circumscribing code as *easy* dangerous for our industry's wellbeing:

> And we don't like to talk about this because it makes us uncomfortable because what kind of capabilities are we talking about? If we're talking about easy in the case of violin playing or piano playing or mountain climbing or something like that, well, you know, I don't personally feel bad if I don't play the violin well because I don't play the violin at all.

> But the work that we're in is conceptual work, so when we start talking about something being outside of our capability, well, you know, it really starts trampling on our egos in a big way. And so, you know, due to a combination of hubris and insecurity, we never really talk about whether or not something is outside of our capabilities. It ends up that it's not so embarrassing after all because we don't have tremendously divergent abilities in that area.

Sigh. The deleterious effect of gatekeeping.

Though what if...I wonder if the author actually intended to describe injectable factory as *simple* by Hickey's definition? Like, requiring less effort to "repurpose, substitute, move, combine, extend", and less coupled ("interleaved"). The root of the word is *one fold, braid, or twist*. That does seem to be accomplished in the design. Nevertheless, I can't get over the heavy connotation of reader culpability and capability  implied in the (weak) qualification of "pretty simple." Language is weird.

I'm thinking it's probably best to avoid "simple" and "easy" in technical writing. Let's not fuzzy match.

This reminds of when the words *good* or *bad* are used when discussing code. Without more objective substance, *simple* evidence, they just do a big hand-wave over facts and truths of the software's outcomes and the shared understanding of the folks in the conversation. Is the software reliable, easy to change? What level of expertise is required, what audience are you interpolating into this discourse of nouns? 

Is simplicity achieved?:

> There are tons of libraries that look, oh, look, there's different classes; there's separate classes. They call each other in sort of these nice ways, right? Then you get out in the field and you're like, oh, my God! This thing presumes that that thing never returns the number 17. What is that?

Is easiness achieved?:

> ...can I get this instantly and start running it in five seconds?

### A better term for unintentional technical debt
#### Tags: technical debt
##### 10/6/2019

The other day I got into a small argument with coworkers during the Sailboat exercise about the meaning of "technical debt." While folks were hunched over stickies and milling about I leaped from my chair and smacked a note on the whiteboard: *application too big*. The slice of monorepo we had been toiling  in the last two weeks was now a super bloom of contributions from different teams. The code had become hard to reason about making it difficult to safely change. We call this too [complicated](https://blog.jessitron.com/2019/09/26/from-complicated-to-complex/):

> It has many interconnected parts, each full of details. Conditionals abound, forming intricate rules that may surprise us when we read them.

In that moment, I was reticent to describe this anchor as "debt" since I'd been thinking more about debt as the future IOW on quality to increase speed in the present. By that measure, you'd be kicking off an amortization plan, hopefully incremental and steady. To think of complicated code emerging from *bit rot* or *cruft* -- or in this case it may have just been not-so-great design -- didn't situate in Cunningham's metaphor for me because it showed up as a surprise. Are we ever really surprised by our credit card bill?  

There are other sources of debt people talk about. Procrastination, neglecting architectural work, neglecting tests. I truly believe the teams working in this code were doing it well, so those felt like an empty net. Then there's the whole category of "unintentional" debt. That also felt wrong. There is an aspect of stuff out of our control but the intent/unintent dichotomy feels unsatisfying if software is a complex system of people, code, automations, feedbacks...I don't know. Language is hard. I guess I'm gliding at the edges of a linguistic constraint.  A *weak* Sapir–Whorfian [confusion](https://en.wikipedia.org/wiki/Linguistic_relativity). 

Nonetheless, I conceded this was *a form* of technical debt. While it may not have been a result of a conscious decision, now that we observed it we could choose to deal with it as debt. Debt is debt whether it arrives by forethought or magical inertia. 

Luckily, as I was catching up on my daily doses of software newsletters this morning, jessitron (who I can't stop quoting) hyperlinked her latest [blog](https://blog.jessitron.com/2019/10/05/dont-just-keep-trying-report-your-limits/) to another [post](https://blog.atomist.com/whats-lurking/) from the Atomist site that gives us what I think is a more accurate language for this very type of technical debt. Frankly, any optimistic (re)casting of language in our field is welcome; we're so prone to a feeling of unfinished, incomplete, overwhelmed. 

> Technology drift is a form of technical debt that comes from progress. As our target architecture advances, it leaves a trail of projects in all its momentary incarnations. As repositories proliferate, the accumulation holds us back. We have many technologies and many versions of each. We have the risks of all of them.

Technical drift! I can get down with that. 

### Two tales of Binary Search
#### Tags: JavaScript, interviews
###### 10/1/2019

I still have lingering rage from two years ago when an interviewer said to me: "I could probably implement this in about 20 minutes." Seriously crushing words to utter offhand during a facetime code screen for someone who has been programming and building web apps professionally for 3+ years.

The problem was something like *find the nearest value to x in the array*. I'm so bad at toy algorithm questions since I basically spent those first 3sh years smashing a ton of Rails and Ember into my brain and worked to be productive building more typical business app/e-commerce style UIs. I wasn't a whiz at data traversal. More like a deep component interface expert. What else would you call it?  Suffice to say a simple *filter* function at 0(n) time would satisfy the requirements. That is lived experience.

But my interviewer pushed me to consider a big fat array. I was stumped, and failing hard in the spotlight. *Only 20 minutes*. Bro even let me spend some time after the interview coming up with a solution to email later, but that was futile. I didn't even know how to properly phrase the problem for Google. I got rejected.

What I learned later is that bro was looking for a solution implementing binary search -- something any CS grad would know. I didn't have a CS background. I learned to program on the job and never had to care about that level of performance in the apps I worked on.

To this day, around 6 years into my career, I haven't had to implement a binary search algorithm to scan over a big data set.

---

Julia Evans put out a short series of zine pages recently that describe best practices for debugging. And guess who showed up? Binary search! Leaning back at my desk chair I realized that all along I've been using binary search in my every day work.

When fixing a bug without a useful stack trace, triangulating the problematic code requires what I used to think as a kind of cludgy technique: step by step, commenting out large parts of the code at the top and/or bottom of suspect files. Like, literally just comment out half the file where you think the buggy code lives. Does the error still throw? If yes, the problem is not in that half. Try commenting out the other half. If no, then keep halving that part of the file. Recursively repeat. This is binary search. Also, did you notice we're now also talking about recursion, a topic that even senior programmers have trouble with?

"Advanced" CS concepts can show up in our work all the time. Whether it's UI, backend, databases, ops, throughout all layers of this mushy cake stack. ("Mushy" as in blended, bleeding, fluid, transitional. Not as in gross, unfit, unstable.) We need to begin reconciling with the danger of narrowly defining their employ and weaponizing them in toy code examples for gatekeeping (cough cough interviewing).

When we learn the meaning behind these CS concepts, we may actually discover more creative ways to use them. Or how they are already part of our toolkit. For example, *git-bisect*!


### Deep(er) software concepts showing up in UI problems
#### Tags: JavaScript, bitwise operators
###### 9/16/2019

I've got three posts in my brain backlog now about more complex software concepts showing up in UI work. Here's the first!

I've been waiting a long time to use a bitwise operator in "real world" JavaScript -- like 5-6 years -- and the opportunity finally presented itself the other day.

In UI, near 100% of the time the basic comparison and logical operators of the JavaScript language give us the power and control we need to express product requirements in code. Equal, not equal, AND, OR, NOT, etc.. But then there's that arcane set of **bitwise** comparison operators. These special boolean operators give us expressiveness for more complex comparison scenarios. They're also just kinda weird because they do comparisons at the binary integral level -- that is, they coerce the values to bits first. 

Take XOR. Which in more layman terms is "exclusive OR". In JavaScript XOR will return `1` when the output of *either side of the operator is different* and 0 if otherwise. Similar to a boolean return, we can easily pass around the result of a bitwise operator as a predicate.

As it turns out, this happens to be the very logic we need for testing existence between two dependent form fields. 

At Eventbrite our UI library has graphical pickers for both date and time form fields. These are placed next to each other and are both required. Even if we initialize the fields with sensible defaults for current date and time, the user is free to change their values. This means the user could easily end up leaving one field blank -- and not having an exact date and time for ticket sales dates doesn't really make sense. Since we want to give the user some immediate feedback if they put the form in this state, we run an XOR validation on blur of either field. 

In order tocheck existence, we don't want to bitwise compare the two sides of the expression directly which could be many kinds of strings. To make the comparison reliable, we cast each side to boolean values with a bang. Then we wrap up the expression in a composable function. The result is a very concise one-liner: 

```
const isOneTruthyAndTheOtherNot = (a, b) => !a ^ !b;
```

Which might be passed around in my hypothetical React event handler like: 
```
dateTimeValidator: (dateValue, timeValue) => {
    const hasEmptyField = isOneTruthyAndTheOtherNot(dateValue, timeValue);
    const error = hasEmptyField ? FORM_ERRORS('dateTimeField') : null;

    this.setState({
        dateTimeFieldError: error
    }

    this.props.onError(error)
}
```

This could be written in a couple ways without the more arcane XOR:
```
... = ( foo && !bar ) || ( !foo && bar );
... = foo ? !bar : bar
```

I'm generally against using overly clever code in codebases that are worked on by less experienced engineers, but I think the bitwise operators are a great tool for anyone to know. And the MDN docs are *very* clear about how XOR works:

> "Performs the XOR operation on each pair of bits. a XOR b yields 1 if a and b are different"

The docs will also introduce you to an algorithmic decision table, which is another useful tool to expose new developers to. We all should be in the habit of writing decision tables more:

a |b |a XOR b
:-----:|:-----:|:-----:
0 |0 |0
0 |1 |1
1 |0 |1
1 |1 |0
  
I have to admit, what always makes this sort of exposé interesting is that the early-web understanding of UI still colors our perception of UI work; like, UI is just a sprinkle of scripting and layout and browser wrangling that gently rests on top of the real software where the computer science happens. Or maybe it's changing. But I feel like there's still too much emotional labor educating the web dev community about complexity throughout all layers of this mushy cake stack. "Mushy" as in blended, bleeding, fluid, transitional. Not as in gross, unfit, unstable.

### White theft, white entrepreneurship
#### Tags: racism
###### 9/9/2019

I've been reading two texts this week. Side-by-side they offer another reveal of the tragic double standard of black and white life in our America. I really felt that truth descend upon reaching 90 pages into *Shoe Dog*, Phil Knight's memoir about starting Nike. On the one hand: a story about a white Christian rich kid manifesting a new destiny for himself away from mediocrity using military connections to build a business with a recently conquered nation. 1964: the year Knight starts Blue Ribbon Sports. On the other hand: I'm half-way through the drudge of Vann R. Newkirk II's long-form in the Atlantic, *The Great Land Robbery*, about the vast land theft and wealth transfer *during the civil rights era* from blacks to whites in Mississipi. 1964: by this year almost 800,000 acres of land have transfered from blacks to whites as a result of *legal* discriminatory (racist) federal farm loan programs and private lenders.

Knight's pop fantasy of himself and the pursuit of a vision to make life about "play" through footwear and lifestyling branding falls so fucking flat against the underlying drivers of the globalization that were making cheap shoes possible -- the return to exploitative capitalism (slavery), maintenance of a permamenent underlcass. Etc. This theft shifted majority voting power before blacks could vote. This theft continues to enrich white investors, hedge fund managers, and agri-business who now own these once-black suffered farm lands. 

Overall I enjoy Knight's story. But the American dream is still available for a white ruling class only -- and those they selectively permit. Holding that heavy. 

### React inline function gotcha, but in a non-obvious way
#### Tags: react, DOM, performance
###### 7/31/2019

I think a lot about Hillel Wayne's blog post [*INSTRUCTIVE AND PERSUASIVE EXAMPLES*](https://www.hillelwayne.com/post/persuasive-examples/) where he does this interpolative critque of a best practice article on unit testing.

His argument is that "instructive" examples don't make a reader care. "Persuasive" examples, on the other hand, are harder to invent, but better. They're hard because:

> 1) If your example is too simple, people brush it off.    
> 2) If your example is too complicated, people won’t follow. They’re also less likely - to trust it, because you complicated example might be concealing a simpler way.    
> 3) If your example is too abstract, people won’t see how it’s useful in practice.    
> 4) If your example is too concrete, people won’t see how it generalizes to their own - problems.   

We see examples of #1 and #4 all of the time in technical writing -- maybe because a lot of it is written for marketing purposes. Y'all, let's be careful about how we present anti-patterns and best practices when we're trying to thought leader. Often this writing ends up being spec or framework documentation plagiarized and adorned with gifs. But without contextual complexity we may be doing a disservice to our fellow humans who dev -- especially less experienced devs.

Persuasive examples are harder but the payoff is bigger. By *demonstrating* the why and why not there's a better chance of putting knowledge into your reader's brain and making it stick. This is certainly my experience. If you:
  
1) Share the reasoning behind all of the small decisions getting from A to B, or determining why A or B is important    
2) Give me code that looks more like code "in the wild"    
3) Explain whether these ideas are new or old    

I'm more likely to recognize anti-patterns or work my way out from under one in a living, breathing codebase.

***

To wit. (An attempt at a pursuasive example.) 

Just this week I toiled on a bug with a colleague that ultimately turned out to be a case of a classic React anti-pattern where an inline function invocation caused a re-render of a Pure Component. 

Now, I've definitely read at least a 3-4 *instructive* articles on the pitfalls of declaring functions inside of `render()`. Perf implications and unnecessary function creation, etc.... But that insight didn't help me or my similarly schooled colleague solve this bug inside a more [complex and complicated system](https://blog.jessitron.com/2019/09/26/from-complicated-to-complex/).

We failed spectacularly to bring our academic rigor to bear because we weren't working with the familiar sandboxed toy code from instructive examples. The root cause became obvious only *after* we did hours of thought-work to pinpoint the problem code. 

Finding problematic inline functions in something like this triviality of Hillel's lament would be much easier: 

```
render() {
    return (
        <button onClick={() => this.setState(…)}>
            Click Me
        </button>
    )
}
```

But in our case, the problem function invocation was buried in a nested component wrapped in a separate  constructor function and abstracted into a separate helper in a separate file and blah dee blah...you get the point. Our journey was starting miles from `render()`. 

Our code better resembled: 

```javascript
// Template.js
export default (...props) => {
    // ...
    const Sidebar = connectSidebar(Sidebar);
    const Main = connectMain(Main);

    return <Layout sidebar={Sidebar} main={Main} />;
}
 
// Page.js
import Template from `./Template`;

export class Page extends Component {
    // ...
    render() {
        return (
            <Template {...props} />
        )
    }
}
```

The bug was observed when a user clicks the "Buy on Map" button in the Sidebar. The click was getting swallowed and not transitioning the view. 

So what was going on? 

When we looked closer we noticed that at the moment of click an unwanted blur event would be triggered on the form field in the `<Main />` component; and its state would be updated. This redux-form state update would then ripple through the component tree and cause the sidebar to be re-rendered, even though none of the props passed to `<Sidebar />` had changed. The result was the sidebar button getting re-rendered *in the middle of the click event*; which meant the click handlers of the newly rendered button were not capturing the click and able to transition to the next view!  

<img src="/assets/images/inline_gotcha_funtimes.jpg" width="600" style="margin: 0 auto; display: block" />

One hack we considered was changing the `onClick` handler of the sidebar button to `onMouseUp` -- the newly rendered button could receive that event (browsers are weird).  But my colleague couldn't let it slide so we decided to troubleshoot the real issue: the sidebar getting rendered every time there was a field blur when it's props weren't changing. 

After [binary searching](#two-tales-of-binary-search) the code code up and down `<Page />`, deleting chunk by chunk until the re-renders stopped, we discovered the fix to be fairly straight forward. Just move the invocation of `connectSidebar` and `connectMain` outside of the `Template` export context into the module context. Fixing the 

```javascript
// Template.js
const Sidebar = connectSidebar(Sidebar);
const Main = connectMain(Main);

export default (...props) => {
    // ...
    return <Layout sidebar={Sidebar} main={Main} />;
}
```

Now, when `<Layout />` is rendered, the child component passed as the prop `sidebar` won't be invoked -- it's already been invoked and the return value of the component has been assigned. In other words, we are not creating a new function and calling it anew each time. 

Sigh. We likely ended up in this place by not being careful with nested connectors and their subscription boundaries. Sometimes you forget that it's just functions all the way down. Like, declaring and assigning a component constructor inside another component constructor would not be how you'd typically compose your functions. I will humbly accept this not uncommon (read: forgivable) symptom of "bottom-up" programming. (See David Kourshid's [talk](https://www.youtube.com/watch?v=RqTxtOXcv8Y) about finite state machines and the sad stories of "bottom-up"). 

Unlike the pristine nirvanic fields of instructive examples, we make our bed in large projects born from large organizations -- cue Conway's law. The requirements for the application accrete in fantastic ways over time. Cue McConnell's oyster farms.  The primitives you start with to satisfy embryonic requirements, like a root-level `<Page />` component, may just become one large prop-drilled well. Graph hell.

This means you suddenly find yourself debugging why a click event on a sidebar button is being swallowed. You notice the divs are flashing in the Elements tab of Chrome dev tools, which means the browser is repainting the sidebar on click -- re-renders! 

Ok, so instructive examples won't necessarily help you. But I'll also asterisk this post and append they aren't worthless either. *Post facto* I can properly identify and classify this bug as a commonly known React problem -- that is, a problem with React composition not a problem inherent to React -- because the instructive examples are out there contouring a problem space and a shared vocabulary. I can then use this shared language when communicating the *what* or *what caused this...* during a retrospective or or incident report. But I suspect I could have arrived to that similar conclusion if I'd read articles that had more persuasive examples.


### 499 closed connections
#### Tags: nginx, debugging, 499, promises, async/await
###### 7/13/2019

Bugs reveal. We look, observe. I learn things. I just experienced another one. 

The customer can't *publish*. Ensue existential [how come???](https://vimeo.com/157670461)

After some investigation we realized our JavaScript was erroneously deleting a parent entity too eagerly in some other flow and leaving us with child data stranded in the db. "Publish" didn't know what to do with bad data. 

The code we found responsible for persisting these entities was designed as a kind of sequential "transaction" (heavy scare quotes because this is definitely a loaded term). 

When the user clicked "Save", separate POST requests for parent and child/ren would be sent one at a time -- our restful API routes didn't allow us to send merged data. Now, in the scenario that the POST request for the child failed, our JavaScript code would send an immediate destroy request for the parent -- like a roll back. Take a look at the code (simplified for example):

<script src="https://gist.github.com/rosschapman/2d75d45892720f70672fb0b4f5625a3c.js"></script>

Can you see how this code was written a bit too simplistically? From what I can tell there are at least two latent problems that make this code prone to fail in a way we don't want.

1) First, a parse error may be thrown during "other synchronous things" after the `saveChildEntity` promise is fulfilled. See a contrived example of that: [async/await with synchronous error](https://codesandbox.io/embed/asyncawait-with-synchronous-error-7c7d5?fontsize=14)

2) Second, it's possible that the POST request initiated by `saveChildEntity` may succeed on the backend and persist the child data, but the connection between browser and server may be severed before the browser recieves the `200` and the promise becomes fulfilled! When that happens, the promise is actually rejected and the runtime goes into the catch block.

It was this numero dos vulnerability that got us.

It seems obvious in retrospect. We allow the user to hit publish anytime which kicks off a heavy network sequence that finishes with a full page reload. But, while the publish sequence is in flight the user can still interact with the page. Meaning they could click another visible button -- "Save" -- that triggers `saveStuffThunk`. Based on the server logs, it seems that fairly often the *publish* would complete and then start to reload the page *right in the middle* of the second `try/catch` block of `saveStuffThunk`. When that happens `nginx` sends down a special `499` status code meaning *the client closed the connection before the server responded with a request*. The JavaScript then interprets this as an error and sends the runtime into the catch-delete block. 

The logs literally read (simplified): 
- POST /save/<id>
- DELETE /<id> 499

It still blows my mind this happened consistently to effect hundreds of records. The browser deterministically queues/coordinates? It was a very strange UX-driven race condition.

In addition to realizing that our thunk code written too...optimistically, another really interesting aspect of this bug was learning that we had missed the really really important requirement of locking the page for the user when they click the "Publish" button. This was actually implemented for other similar interfaces, but when my team implemented a new screen with similar access to the "Publish" button, we didn't fully understanding the potentiality of allowing this race condition. Or how to prevent it.

Sometimes. Bugs are sometimes a result of a big complex system with fast-shifting pubertal code and fugitive ownership creating blind spots. 
> "Every existing feature, and even past bugs, makes every new feature harder. Every user with expectations is a drag on change." - [jessitron](https://blog.jessitron.com/2019/06/17/feature-interaction/)

It sucks but we observed some new things and thereby learned some new things.

Even another cool, tangential observation/learning came from understanding the possible sources of 499s. I did some digging into this and discovered that connections *could* be cancelled eagerly by a load balancer, or proxy "client," upon a timeout. See: [Nginx 499 error codes](https://stackoverflow.com/questions/12973304/nginx-499-error-codes#comment98898883_18410932). Our server ops folks were able to confirm we did not have a load balancer managing the requests. Demystifying is an important part of this process. Don't follow clues you don't have to. A timeout might point to a slow service. 

I'm just hard reflecting on on how signals of "broken" -- like bad data -- can reveal many interesting things about the system. Just think about how much our JavaScript promise handling hid potentialialities.  

### Debugging a test that does nothing
#### Tags: debugging
###### 6/24/2019

This weekend I spotted Julia Evans posting some tips about debugging -- of course a zine followed -- and it resonated deeeply because it touches on one aspect of debugging that I often struggle with. It's comforting to know this is a common kind of struggle!

[<img src="https://pbs.twimg.com/media/D9wWNfFXoAcsUqq?format=jpg" />](https://twitter.com/b0rk/status/1142812831420768257)

Every time we sit down to debug a program we bring a narrow worldview to bear about how the program *should* work. Oftentimes this assumption is what makes the debugging process laborious. It becomes a heated, lasting tango between your worldview and your proofs against the current environment, with expected data inputs, in a certain test harness, etc... 

While this dialectic ensues you're also receiving feedback, often surprising, which may expands the dance may expand to test out different hypothesis. Or it may contract when you foreclose a set of possibilities. You unlearn, go back, change course. The tango lasts. 

Though frustrating, this is natural. It's impossible to throw out all we know at the beginning and re-interrogate every line of code. 

> ...you just have to pick one and start checking.

Patience is what we need, as we methodically unpack our worldview from the inside out.

This past week I spent a good part of two days wrestling with a broken acceptance test in a somewhat unfamiliar part of code where my initial assumptions misled me from the start.

The test was written to observe a state change by simulating a click on the first menu item in a dropdown, which flips the disabled state of a Purchase Button elsewhere in the container component! That assertion was no longer passing. Because my new code had changed the source of the the initial values for the dropdown, I had set my sights on determining if that source data in the test was wrong. 

Sigh, that wasn't quite it. I spent a bunch of time interrogating these source values in the test setup for the dropdown menu but in the end they were correct -- my initial presumption and assumption (worldview) steering me into a void. Sucked.

After repeatedly playing with the test instructions and comparing to the outcome in the browser, I discovered the click action was doing nothing because the initial state for the Purchase Button was already set through a test setup step which *equaled the first value of the dropdown menu*; so the click action didn't actually change the value in the test (I was finally able to repro this in the browser). There was no state change to observe. In fact, and this is the best part, the test wasn't needed at all. My code change inadvertently exposed a test that was applying false assumptions to the code. 

Lol, how much of our software is layer cakes of fallacious worldviews???

### Pre-crude development
#### Tags: legacy code 
###### 6/19/2019

I caught [this tweet](https://twitter.com/ruthmalan/status/1141169409609863170?s=20) by Ruth Malan yesterday which references the "tension between continuous evolution and product instability". This is a tension we hold as software engineers daily. It's the source of these "trade-offs" that we often talk about. 

At the start of my career I thought that longer-lived codebases would be more manicured and predictable  than the embryonic Rails app I was working on. I presently work in a legacy codebase (like 10+ years running), and I'm not really sure if it's much more stable than that 3 year-old startup experiment. Sure, there are fossilized pieces of code in corner tar pits that have run largely unattended for years which we can ignore, and beautiful code abounds. But I find myself often in labored negotiation with code in-between those ends, code that has a mix of pieces written a year or two ago, and then some new additions in the past few months. We might call this code pre-crude pressurized compounds with some new raw material shoveled in -- forming. These are tension points where I struggle with the tension the most. There are just enough layers of abstraction, code reuse, shared responsibilty, etc... -- tensile strength -- that don't make changing the code easy. Any change could destabilize things, like expose bugs, ie break existing functionality. 

So the day-to-day discipline in legacy code is wiggle in tension to add/change behavior, but also support all existing behavior. jessitron quotes in a recent [blog](https://blog.jessitron.com/2019/06/17/feature-interaction/): 

> Every new feature comes with the invisible requirement: “and everything else still works.”

This is a wild task in pre-crude places! 

### Too many imports
#### Tags: javascript, react, refactoring
###### 5/11/2019

There are too many imports in this file. I'm staring down like 50 lines of imports. External libraries (React, Lodash, etc...), to our own internal libraries, to components, to helpers, to constants. The last bothers me the most because they feel like implementation details I want hidden away in these other components or helpers.
And as am I'm looking at this statement inside a `render()` block:

```javascript
const isSoldOut = this.props.statusType == SOLD_OUT
```

I'm suddenly reminded of what Kyle Simpson told me on twitter a couple weeks ago: 
> "in 'functional programming', we love and embrace functions! functions everywhere!" -- [@getify](https://twitter.com/getify/status/1123408796276142080)

That's it, that's my out. We can refactor this down to a data utility. 

```javascript
const isSoldOut = ({status}) => status === SOLD_OUT
```

Or we might even abstract this into a general utility if it makes sense:

```javascript
const getTicketStatusType = (ticketProps) => STATUS_TYPES_MAP[get(ticketProps, 'status')];
```

While these functions are not decreasing the number of imports, I'm perhaps doing a few other useful things:

1.  Cutting down the number of imports from _different_ files
2.  Creating a reusable abstraction -- which I know can be employed elsewhere
3.  De-cluttering `render()` which makes integration tests simpler, possibly unnecessary for some cases since logic can be independently unit tested

That last point is important. At least to me. Untidy `render()` blocks are hard to scan, debug, and test. The machinations for constructing and composing the things to render can happen in other places: above the component class definition, in class methods, or in a separate file. The first options is one I quite like because abstractions don't have to be all that general. It's great if they are localized to the component at hand.

### Starting a new blog and jumping right into an article I read about dependency injection using function parameters
#### Tags: python, design patterns 
###### 4/10/2019

Read [Ensuring Clean Code: A Look at Python, Parameterized](https://www.toptal.com/python/python-parameterized-design-patterns) this morning. Parameters as DI! So yeah, now that we have default parameters in JavaScript -- as of ES6 -- we can think of parameterized DI for JS too; right there in our function declarations. This is super familiar if you're coming from JS where funcs are first class.
