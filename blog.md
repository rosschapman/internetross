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
.markdown-body h3:not(:first-of-type) {
    border-top: 1px solid #d4d4d4;
    padding-top: 2em;
}
.gist .blob-num:hover {
    color: inherit;
}
</style>

### Maybe Eithers
#### Tags: functional programming, maybe, either, promises
##### 12/10/2019

A recent issue of JS Weekly reposted a [new piece](https://medium.com/javascript-scene/handling-null-and-undefined-in-javascript-1500c65d51ae) by Eric Elliot that thinks through creative ways we can work with nullables in JavaScript. I read it. It lit up my memory. 

One of the first Lambda Cast episodes I listened to was [#6](https://soundcloud.com/lambda-cast/6-null-and-friends): *Null and Friends*. At this point in time I'm near the start of my FP cultivations, sometime mid- last year I think. It's probably around the time I was finishing Kyle Simpson's [*Functional-Light JavaScript*](https://github.com/getify/functional-light-js). I was fairly shocked to hear the bros discuss functional languages that are *designed* to keep null out of your programs. I could feel myself starting to consider the FP language hype, especially the hype around eliminating uncertainty.

Elliot characterizes `null` and `undefined` as "optional values". (I'd also throw empty strings into the bunch when they are used to stand in for an unselected value, ie nothing, empty, absence. Gosh even `0`.) All of these are problematic in JavaScript when they represent data that will be passed around in your system because somewhere, some code is going to expect a *real* value with an assigned `String`, `Number`, `Object`, `Function`, `Boolean`, etc... Basically the language lets us get away with answering *I don't know* without much declarative leverage. 

> FUNCTION A: Alright here's some data, can I have that back nice and neat please before I send it to the customer.    
> FUNCTION B (inside A): Yeah sure...wait...ermm...I don't think so actually...yeah I don't know.    
> FUNCTION A: Ok great I'll just show nothing to the user forever or maybe crash the system.    
> FUNCTION B (inside A): 
 
Elliot brings up the case of uninitialized data right away in a list of common sources of null:

> 1. User input
> 1. Database/network records
> 1. **Uninitialized state**
> 1. Functions which could return nothing

I've got an example from the office.

In our application there is a form field which represents a *potential* maximum limit on the number of holds that can be placed on a type of ticket for an event sale. There are two types of input this input field can receive from a user: an integer or nothing (ie, be lefty empty). The latter signifies that the user desires to unrestrict the number of holds. 

Now, having fields that can be empty is necessary to the product and business logic. It's quite commonplace and a customer would never think twice about the dark alchemy we're performing behind the scenes. What Rashida J. Cumberbun doesn't know is that the `limit` field maps to a db columm that expects an `INT`. Thus, if they were to leave the field empty, or remove a number that was already there, and then submit the form, we need to make sure that that absence of INT is transformed into stringified representation of zero `{limit: 0}` for the POST body. Empty form data must become a number through the magic of sensible defaults and server/client contracts: 
```
limit = formData.limit || 0
```
A reverse alchemy happens from the other side when our React code initializes the form. We hand our form builder an empty object -- in other words a bunch of key/value pairs with field names as keys and `undefined`s as values; the builder then converts these `undefined`s to appropriate defaults. In the case of our limit field, we do another short-circuit evaluation to produce an empty string which our form builder can render to the user as *blank* -- with a helfpul hint of course: 

```
limit = initialData.limit || '';
```
As you can see in this fairly simple, deadly straightforward and commonplace web application code, we are forced to putz around with a notion of *nothingness* for a potential data value and end up with phase-shifting duck typed values. `null`, `''`, or `0`. The last twisting mind eff turn in this case from the office is that, as I mentioned earlier, *the zero means unlimited*. Leaving the field blank is not a *lack*, but bountiful! And so `1 + 1 = 2`. Nothing is not nothing, but we have to use `null` and friends for lack of a better representation of something that is empty.

And to say nothing of the possibility that something might be assigned `null` meaningfully in your codebase. Like, lets just admit it's impossible to truly prevent these *nothings* from entering our JavaScript programs. Like, you can't serialize *nothing* for a value an API response formatted as JSON. 
```python
>>> json.dumps({name: }
  File "<stdin>", line 1
    json.dumps({name: }
                     ^
SyntaxError: invalid syntax
```
Or try and stringify an `Object` back up again with the same:
```javascript
>> JSON.stringify({name: })
SyntaxError: expected expression, got '}'
```

`Null` and `undefined` are optional in JS but they are not illegal. Haskell, on the other time, complains at compile time.

Elliot does an interesting rhetorical jiu jitsu by giving us new options for optional values. In liue of eviscerating null from JS, we can work to push `null` to the edge of our programs with a handful of innovative approaches. In a sense we can ignore nullables and declutter areas of code which can just focus on data pipelining and other UI biz logic. Techniques include: constructing state machines -- highly determined object interfaces -- that error without values set to a wanted data type; ie *something*. We can also take advantage of that new new: Optional Chaining. And then there's borrowing from FP. The last I love. 

I've already been thinking about Maybes a lot recently. My last post was about using "maybe" in function names to battle the unrealistic binary of if/else with better signaling to other developers; like, a function may or may not complete it's designated purpose if an async call fails or an argument is unacceptable. The real word is far too fuzzy. In contrast to the imperatives of JS, FP languages substitute nullable data with algebraic structures that encapsulate possibilities of existence or nothingness. For example, the actual *Maybe* data type represents either a *Just* (truth, success, completion) or *Nothing* (false, error, incompatibility). Data that's wrapped in a Maybe and operated on won't leak a nullable into our program, like the commonly observed `undefined`. Obviously implementations vary across libaries. Here's a simple example from the [Practica](https://github.com/rametta/pratica) library which demonstrates the way that using Maybe can simplify code:

```javascript
import { Maybe } from 'pratica';

const data = await fetchAllPeople(...);

Maybe(data)
  .map(people => people.filter(person => person.cool))
  .map(people => people.map(getNames))
  .map(names => name.toUpperCase())
  .cata({ 
    Just: transformedData => render(transformedData),
    Nothing: () => console.log('Womp, no data returned from API.')
  })
```
(Btw, "cata" stands for *catamorphism* and means to decompose the Maybe container into simple values. Honestly, I'm not good enough in the category theory yet to confidently distill it for you completely -- pun intended -- but that's the gist.)

A more basic JS solution might look like: 
```javascript
const data = await fetchAllPeople(...);

if (data) {
    const coolPeople = people => people.filter(person => person.kind);
    
    if (coolPeople.length) {
        const formattedKindPeople = people => people.map(formatPersonForDisplay);
        render(formattedKindPeople)
    } else {
        console.log('Womp, only unkind people.')
    }
} else {
    console.log('Womp, no data returned from API.')
}
```
The combination ofFP-style data pipelining -- a result of Maybe being a monad, I think -- and control flow encapsulated in the data type itself, we get a semantically rich and easy-to-read solution without nullables and  exhausting boilerplate; ie, param existence checks.

But I digress.

Where Elliot really surprised me was drawing a line between FP's similar-to-Maybe data type *Either* and JS's own Promise. Tucking `null` away with Promises is super neat. Let's see how that plays out in a sec. 

While maybes represent one or no value, Just or Nothing, Either implementations are slightly different in that they represent one *or* the other, but not both. If you're familiar with bitwise XOR, it's the same algorithm. In place of a Nothing or performing a noop, however, Eithers provide a secondary branch for an error case. Let's see it in action. 

Take Elliot's example of a small abstraction that hides `null` checking away in a kind of promisified ternary (which I've slightly modified):

```javascript
const exists = x => x !== null;
const ifExists = value => exists(value) ?
  Promise.resolve(value) :
  Promise.reject(`Invalid prop: ${ value }`);

ifExists(prop.name).then(renderName).catch(log);
```

Here basic null checking and *primitive" if/else binaries are replaced with a more expressive, semantically rich statement for the logical disjunction: proceed this way if success, or that way. 

Now, logging an error doesn't get us very far from param checking and early returns. A slightly more interesting example might be something like: 

```javascript
const inputExists = x => x !== '';
const ifInputExists = value => inputExists(value) ?
  Promise.resolve(value) :
  Promise.reject(`Input is blank`);

onInput((prevValue, nextValue) => 
    ifInputExists(nextValue)
        .then(validate)
        .catch(trackClearInput(prevValue))
```

It's hard to see the real power of this for a simple resolve/reject example. It just feels like a fancy if/else, right? But if we extrapolate from this base interesting things start to happen. Here's a slightly modified version of example from Practica's docs with an imaginary Either that uses Promises under the hood and implements a `chain` behavior:

```javascript
const isPerson = p => p.name && p.age
  ? Promise.resolve(p)
  : Promise.reject('Not a person')

const isOlderThan2 = p => p.age > 2
  ? Promise.resolve(p)
  : Promise.reject('Not older than 2')

const isJason = p => p.name === 'jason'
  ? Promise.resolve(p)
  : Promise.reject('Not jason')

const person = awaitfetchPerson(...);

Either(person)
  .chain(isPerson)
  .chain(isOlderThan2)
  .chain(isJason)
  .then(p => console.log('this person satisfies all the checks'))
  .catch(msg => console.log(msg)); // if any checks reject, then this function will be called. If isPerson rejects, then isOlderThan2 and isJason functions won't even execute, and the err msg would be 'Not a person'
```

Suffice to say I'm quite tickled by the re-purposing of Promises as Eithers. You can start to imagine how one might construct custom-fit control flow *chains* and layer cakes using thenable types to play nicely with other function composition and pipelining. I'm not always in love with (what feels like) sacrificed readability with chaining over stacked lines of assigned returns or async/await. But seeing it an action using Practica I'm starting to believe more and more in its viabiilty, even in a codebase touched by less experienced or new developers. 

Gripes with FP readability aside, it's eye-opening to look at available JS language features and see them in a different light. Also, aside from the clever use of Promises, just getting the null check into an abstraction `exists(...)` already has us using an FP mindset to build strong declarative (function-first) foundations.

### Maybe maybes
#### Tags: naming, javascript
##### 11/18/2019

Migrating my content from Medium was due, but this past week became a particularly opportune time to repost some old content on the subject of naming. Because I'm in one of those feels again, y'll. And it's about one of the two hard things enshrined by Phil Karlton. Really we just float in a crisis of language trying to speak correct enough to make some money. Between thought and action. Between computer and person. Betwee persons.

*How do I communicate to the next developer that this function might do one thing, or it might do another?*

The other day I'm refactoring some code and picking apart a function to understand how it works. Let's call this function `saveThing`. It's about 60 lines. Kinda medium-sized but a lot of lines are neat procedural steps of computation. The part that's quizzical to me is a condition that will exit the function if the user is missing a permission. So...sometimes this function won't save a thing. 

This is FUNKY. I want to rename the function to `maybeSaveThing` because the steadfast verbage seemed incorrect. Like, literally it was signaling something wrong to me about it's gist. I think I may have been particularly sensitive because I had already spent two days refactoring a bunch of code in this area and was becoming a bit exasperated with various kinds of misdirection. I really wanted the code to start being straight with me. But it's when we're weakest that we need the code to be *brutally* honest. Fixing critical bugs. Nearing deadlines. When stuff's happening at home. In the world. Ironically, these modes reveal the code's honest readability. 

But this could be a matter of style. I'm not sure. I'm mulling it over. I have colleagues who think `maybeSaveThing` isn't really necessary. The internal conditional is obvious enough once you peer inside. I think I'm going to fight with them more about it. 

I felt validated when a homie from a JS community I hang with on Slack gave me an example of production code from his place of work: 

```
componentDidUpdate() {
    this.maybeRedirect();
    this.updateTitle();
    this.maybeDoActivation();
    this.maybeInjectSampleTimelineItems();
},
```

I LOVE this. Don't you think it reads nicely? Like, you can really understand the sequence. The *maybes* communicate a true story of many possibilities. I'm imagining refactoring this component transition block. These function names are helping me decide what to care about now or later; to *maybe* deal with them or not.

### “do” helper for emphasis in variable naming 
#### Tags: naming
##### 11/10/2019

[Reposted from medium](https://medium.com/@internetross/positive-emphasis-in-variable-naming-34b12a9ca583)    
Originally published: 9/19/2015

However you mental wrap the process of realizing virtual things (writing, accretion, [rose gardening](#whats-in-aname)), there’s no question literary-ness does imprint at some point on IDE surfaces. In my experience working in the higher stories of the tower (cloudgineering, we so high): up there with web pages, casually cast instructions inRuby and JavaScript, cascades in hierarchical CSS computer notation, and declarative document formatters (XML, HTML); up here you’re definitely notating control flows and arguments that require semblances to English lang. Arguments. Computer languages.

The other day I surprised myself by forming an excited opinion during code review about what a variable should be called. I guess the time had done arrived; I had spent just enough time in Ember and client state management to become OCD about the signifiers being passed around. And so I found myself feeling incomplete when I read over a line of code announcing a state change event that facetChanged. I can’t totally explain it but this wording felt insufficient. I instinctively wanted more. Needed surge troops. Something like…facetDidChange.

The difference is slight, but important.

(It’s hard, y’all. One of two things.)

I researched the grammar to figure out why the variable was letting me down.

Turns out the “do” helping verb isn’t a special thing. But when added to another verb in the preterite, it increases emphatic assertion heaping deeper credibility on the thing that did happen. You can really feel it on your brain tongue, right? The additional slam ofd in the phrase, like doors shutting — the hardness more certain.

Or maybe the reassurance is there because of the influence of the black/southern dialect on modern American english; the Shakespearian-like emphasis where past finality is hammered home when something done happened, or 2x emphasized when someone done did.

The code doth protest too much??

Eh, I didn’t push for a rewrite in the code review. Naming is a bar brawl and sometimes you fight and sometimes you don’t. The author is balancing empathy for their colleagues with their own mental frame of the application at the moment they create the code; and then there are many an english word and conventional abbreviations, degrees of formality and tone. There’s a reason Steve McConnell dedicates 30 pages on The Power of Variable Names. And this section doesn’t even explicitly tackle naming receivers, subscribers, etc…

Just tryna make sense of what these users be doing.

### What's in a name?
#### Tags: naming
##### 11/10/2019

[Reposted from medium](https://medium.com/@internetross/what-s-in-a-name-a60460494e93)    
Originally published: 9/19/2015

There's always heated babbling (err…babeling) on the cyberspace to assign metaphor to our embryonic field of building digital things: writing or engineering or accretion. One thing for sure, humans have a religious proclivity to conquistador in the bikeshed when faced with terra incognita. Perhaps, ironically, because it's something of a science and therefore seems to ask for a pinning down. But these guys, some of us, just seem unable to leave it alone to variance; to let it lie under a broad, mercurial atmospheric plane of something like creating.

I remember when I attended my first Railsconf in 2014. In the opening keynote DHH made a todo about software writing (and more famously that TDD was dead).

Hello, World!

Fucking comma in there. You got an author-face bro.

At that time, 2014 in Chi-city (my place of birth), I was too green building product to really care what you called what I was doing. (Maybe I'll never actually care that much.) It wouldn't have helped me get a quicker handle on the revealing module pattern.

And then, a couple days later in the closing keynote, Aaron Patterson rebukes the writing metaphor and talks about the advanced engineering of improving Rails 4 query performance. They totally did that on purpose. Those bros.

What's in a name? Sigh, we don't have the luxury of poetic soliloquy when getting business done and keeping this company afloat. Shitty code smells like shit no matter what you call it. I'm not gonna care too much for now what the pontificators put on the RHS.

`- <-{@`

### More about anointed princes and gatekeeping culture
#### Tags: gatekeeping, software industry, gee paw hill
###### 11/7/2019

Ok, gonna brain dump a little because I got excited about some synergy! Maybe I'm just really starting to find some peeps in the trillicon valley zeitgeist. 

Gee Paw Hill published a <a href="https://www.geepawhill.org/2019/11/01/thin-culture-and-stories/">blog</a> a few days ago that retrospects on geek culture gatekeeping (I think we can basically proxy *software industry* for geek culture here). He presents this notion of our geek culture as "thin culture"; boundaried, exclusive. Lo and behold I was pleasantly surprised to see him use the phrase "anointed princes" to describe the folks -- "they're usually men" -- who perpetrate the thinness. Yay because this is nearly identical language I used in my <a href="#harmful-ways-to-write-about-software">last post</a> for analyzing the behavior I saw in some other internet writing that made me feel poopy. I feel validated. 

Feels! 

I like that he backtracks the finger-pointing though; like, a fire with fire counter is a non-helpful meanness here. But also, I'd argue some anger first is ok. "Anger is clarifying" -- as Fleet Maull once told me many years ago. Or maybe a tool. Today during the Human Dimension of Business training at work we practiced the art of the *rant* -- privately journal your story of blame -- as a bridge step to toward truth and clarity; and as a way to measure and check our extra assumptions against the NVC-like framework ("The facts are...", "I feel...", etc...). 
 
There's some interesting stuff in Gee Paw's reflection. I feel armed with richer clues about where gatekeeping culture is inherited from, and inspired again to  work with it in my own being.

Loneliness, isolation, computer as friend, for some of these guys. I mean these are kind of obvious origin story props that will perpetuate harm and abuse across generations. It also may be a narrative setup for geek thinness that Gee Paw warns us to see for fiction.

But I think, bringing his frame of three gatekeeping behaviors that keep our culture narrowly defined -- "badging, self-blindedness, atemporality" -- to any reading or conversation with the *anointed princes* in our industry will likely save us from feelings of smallness. (Those of us who came in through the side door; ie not academia). And to my fellow white dudes, it will help us break the cycle of abuse. 

Lets freestyle this a little bit:

- Not badging. "I look like an eningeer." "You look like an engineer." Ugh, let's not deploy the informal logical <a href="https://en.wikipedia.org/wiki/No_true_Scotsman">*no true Scotsman*</a> fallacy to move the goal post for what an engineer means. There's so much more to coding than producing code artifacts in a text editor. 
- Self-awareness. "My story is not the only story." Am I projecting my loneliness and sense of scarcity? Lately I've really been feeling the idea that patriarchy teaches that there is a scarcity of power. If only there was someone capable of wielding the power that's there for the taking; then, then real change could be achieved. Why do we use an authorative voice in technical writing? Software is always so messy. Mastery should not be tied to self-worth.
- Historical. There used to be more women in tech but men kicked them out. Hidden figures. Our industry was born out of cold war-time fear. Our interview practices were designed to select codebreakers. Our greatest successes have created more work, not less; have created the perfect, legal, capitalistic social engineering appliance for foreign powers to influence our democracy.

### Harmful ways to write about software
#### Tags: gatekeeping, java, oop
###### 10/10/2019

*Dispatch from Soekarno-Hatta International Airport.*
*Arrived way too early because of traffic fantasies.*

While leafing through my daily software briefs I came across an article with that dissapointing refrain in our industry: *this should be easy to do*. There's probably no better way to put a reader on the defensive and create an adversarial teaching situation. Suddenly I'm challenged to match the author's intellectual prowess or else remain befuddled and continue writing shitty code. Why you fuckin with my head???

The article is another offering to the OO world which introduces the dependency indirection "injectable factory" design pattern as a cure for "rigid direct dependencies" in unit tests. Super simple stuff.

Also just LOL the indexical disambiguation science of the OO world. I'm just in love with Steve Yegge's satire about this. A true [kingdom of nouns](https://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html). Frankly it's a deliciously bookish world compared to JS-land where it's function function function function.

If I grokked it right, I think the article is just a way of instructing the use of mocks without dependency injection, helping you avoid writing a service implementation for your tests that looks like this: 

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

Ah yeah that looks hairy. I'm flashing to Jest unit tests where small function implementation details are mocked all the way down. 

I remember a moment, a phase if you will, in my first couple of years working professionally as a softwhere engineer when I thought that understanding OO design patterns was part of our right of passage into...seniority, I guess? At the time I was beginning to write more in the Rails parts of our codebase and as a consequence, began inheriting a pressure, a notion -- from where I'm not sure -- to achieve familiarity with common OO design patterns.

From where, indeed. It's really subtle how this worldview is propogated amongst our ilk but I think I'm starting to see, with clear eyes, the quiet, viral expansion. 

For example, this digesis about "injectable factory" thats got me irked. When the author completes the situation and complication setup, he begins his solution section with: 

> The pattern is pretty simple.

Umm great, so what you're proposing is just a fancy name for something I probably already know about? But then: 

> It’s implemented as a mutable value holder. This pattern is related to the factory, service locator, singleton pattern and ambient context pattern. All these patterns are considered anti-patterns according to most DI articles. But in practice, those patterns, especially singleton, are very handy and useful. They are prevalent in almost every non-trivial project. But they come with caveats. InjectableFactory tries to prevent those caveats at the same time keep the convenience and simplicity of those patterns.

It's so simple I just need to have a solid undertanding of these (what must be other simple) concepts as well:

1. dependency injection
2. a value holder (probably Java slang for some kind of variable?)    
3. mutable value holder    
4. factory pattern    
5. service locater pattern    
6. singleton pattern    
7. ambient context pattern    

I'm reminded of Rich Hickey's 2012 Rails Conf [talk](https://www.youtube.com/watch?v=rI8tNMsozo0) where he disambiguates *simple* from *easy* which is a linguistic casuality which creates confusion in our industry about what "simple" or "easy" software really is or achieves.  In the talk Hickey helps recoup a specificity for each word through an etymological tracing. Distilled you take away that *simple* is objective and *easy* is relativistic.

In consideration of the foregogin, our Javian knight likely means *easy*, which, by Hickey's redefinition (rather reinstatement of acuity), means a spacial relativism of *nearness*. As in *easy to go to or get* or near to our understanding. In other words *familiar*. Like a better developer experience. Like: 

> ...can I get this instantly and start running it in five seconds?

But he probably also means *"being near to our capabilities"*, the promise of easy.

Even if the usage intent is closer to Hickey's *easy*, what about this list of like seven things I need to know that may not be near my capabilities? Like, easy for whom? What type of reader is summoned here? Since the author never names his imagined reader/audience we'll never know for sure, but we can infer it's likely folks who are experts in OO and the Java lang. Perhaps that's the transgression that bothers me. This invocation of *simple* to self anoint as meister amongst a court of meisters, but without warning patronizingly forecloses access for an unitiatied reader. I think this is the gatekeeping emerging, infectiously. Almost too quickly to observe. I'm really glad Hickey also finds circumscribing code as *easy* dangerous for our industry's wellbeing:

> And we don't like to talk about this because it makes us uncomfortable because what kind of capabilities are we talking about? If we're talking about easy in the case of violin playing or piano playing or mountain climbing or something like that, well, you know, I don't personally feel bad if I don't play the violin well because I don't play the violin at all.

> But the work that we're in is conceptual work, so when we start talking about something being outside of our capability, well, you know, it really starts trampling on our egos in a big way. And so, you know, due to a combination of hubris and insecurity, we never really talk about whether or not something is outside of our capabilities. It ends up that it's not so embarrassing after all because we don't have tremendously divergent abilities in that area.

Sigh. The deleterious effect of gatekeeping. Like is there some insecurity at play here for the author that requires he front his meisterness? 

Though what if...I wonder if the author actually intended to describe injectable factory as *simple* by Hickey's definition? As in, requiring less effort to "repurpose, substitute, move, combine, extend", and less coupled ("interleaved"). The root of the word is *one fold, braid, or twist*. That does seem to be accomplished in the design. Nevertheless, I can't get over the heavy connotation of reader culpability and capability implied in the (weak) qualification of "pretty simple." Language is weird.

I'm thinking it's probably best to avoid "simple" and "easy" in technical writing. Let's not fuzzy match.

This reminds of when the words *good* or *bad* are used when discussing code. Without more objective substance, *simple* evidence, they just do a big hand-wave over facts and truths of the software's outcomes and the shared understanding of the folks in the conversation. Is the software reliable, easy to change? What level of expertise is required, what audience are you interpolating into this discourse of nouns? 

Is simplicity achieved?:

> There are tons of libraries that look, oh, look, there's different classes; there's separate classes. They call each other in sort of these nice ways, right? Then you get out in the field and you're like, oh, my God! This thing presumes that that thing never returns the number 17. What is that?

Is easiness achieved?:

> ...can I get this instantly and start running it in five seconds?

### A better term for unintentional technical debt
#### Tags: technical debt
###### 10/6/2019

The other day I got into a small argument with coworkers during the Sailboat exercise about the meaning of "technical debt." While folks were hunched over stickies and milling about I leaped from my chair and smacked a note on the whiteboard: *application too big*. The slice of monorepo we had been toiling  in the last two weeks was now a super bloom of contributions from different teams. The code had become hard to reason about making it difficult to safely change. We call this too [complicated](https://blog.jessitron.com/2019/09/26/from-complicated-to-complex/):

> It has many interconnected parts, each full of details. Conditionals abound, forming intricate rules that may surprise us when we read them.

In that moment, I was reticent to describe this anchor as "debt" since I'd been thinking more about debt as the future IOW on quality to increase speed in the present. By that measure, you'd be kicking off an amortization plan, hopefully incremental and steady. To think of complicated code emerging from *bit rot* or *cruft* -- or in this case it may have just been not-so-great design -- didn't situate in Cunningham's metaphor for me because it showed up as a surprise. Are we ever really surprised by our credit card bill?  

There are other sources of debt people talk about. Procrastination, neglecting architectural work, neglecting tests. I truly believe the teams working in this code were doing it well, so those felt like an empty net. Then there's the whole category of "unintentional" debt. That also felt wrong. There is an aspect of stuff out of our control but the intent/unintent dichotomy feels unsatisfying if software is a complex system of people, code, automations, feedbacks...I don't know. Language is hard. I guess I'm gliding at the edges of a linguistic constraint.  A *weak* Sapir–Whorfian [confusion](https://en.wikipedia.org/wiki/Linguistic_relativity) that I can't peak around. 

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

At Eventbrite our UI library has graphical pickers for both date and time form fields. Our designs typically place these individual components next to each other and make them required. The user is free to change their values, though we do provide sensible defaults. One not so surprising possibility is that a user can leave one field blank by accident. Of course, not having an exact date and time for ticket sales dates doesn't really make sense. Therefore, since we want to give the user some immediate feedback if they put the form in this state, we run a validation on blur using XOR logic! 

Nonetheless, for checking existence, we don't want to bitwise compare the two sides of the expression directly which could be many kinds of strings. To make the comparison reliable, we cast each side to boolean values with a bang. Then we wrap up the expression in a composable function. The result is a very concise one-liner: 

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

The docs will also introduce you to the algorithmic decision table for the XOR logic, which is another useful tool to expose new developers to.

a |b |a XOR b
:-----:|:-----:|:-----:
0 |0 |0
0 |1 |1
1 |0 |1
1 |1 |0
  
What always makes this sort of exposé interesting is that the early-web understanding of UI still colors our perception of UI work; like, UI is just a sprinkle of scripting and layout and browser wrangling that gently rests on top of the real software where the computer science happens. Or maybe it's changing. But I feel like there's still too much emotional labor educating the web dev community about complexity throughout all layers of this mushy cake stack. "Mushy" as in blended, bleeding, fluid, transitional. Not as in gross, unfit, unstable.

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

After [binary searching](#two-tales-of-binary-search) the code code up and down `<Page />`, deleting chunk by chunk until the re-renders stopped, we discovered the fix to be fairly straight forward. Just move the invocation of `connectSidebar` and `connectMain` outside of the `Template` function context into the module context. Fixing the 

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
