# 6/19/2019
## Pre-crude development
### Tags: legacy code 

I caught [this tweet](https://twitter.com/ruthmalan/status/1141169409609863170?s=20) by Ruth Malan yesterday which references the "tension between continuous evolution and product instability". This is a tension we hold as software engineers daily. It's the source of these "trade-offs" that we often talk about. 

At the start of my career I thought that longer-lived codebases would be more manicured and predictable  than the embryonic Rails app I was working on. I presently work in a legacy codebase (like 10+ years running), and I'm not really sure if it's thaaat much more stable than that 3 year-old startup experiment. Sure, there are fossilized pieces of code in corner tar pits that have run largely unattended for years which we can ignore, and beautiful code abounds. But I find myself often in labored negotiation with code in-between those ends, code that has a mix of pieces written a year or two ago, and then some new additions in the past few months. We might call this code pre-crude pressurized compounds with some new raw material shoveled in -- forming. These are tension points where I struggle with the tension the most. There are just enough layers of abstraction, code reuse, shared responsibilty, etc... -- tensile strength -- that don't make changing the code easy. Any change could destabilize things, like expose bugs, ie break existing functionality. 

So the day-to-day discipline in legacy code is wiggle in tension to add/change behavior, but also support all existing behavior. Jessitron quotes in a recent newsletter: 

> Every new feature comes with the invisible requirement: “and everything else still works.”

This is a wild task in pre-crude places! 


# 5/11/2019
## Too many imports
### Tags: javascript, react, refactoring

There are too many imports in this file. I'm staring down like 50 lines of imports. External libraries (React, Lodash, etc...), to our own internal libraries, to components, to helpers, to constants. The last bothers me the most because they feel like implementation details I want hidden away in these other components or helpers.
And as am I'm looking at this statement inside a `render()` block:

```javascript
const isSoldOut = this.props.statusType == SOLD_OUT
```

I'm suddenly reminded of what Kyle Simpson told me on twitter a couple weeks ago: 
> "in 'functional programming', we love and embrace functions! functions everywhere!" -- [@getify](https://twitter.com/getify/status/1123408796276142080)

That's it, that's my out.

```javascript
const isSoldOut = ({status}) => status === SOLD_OUT

// Or we might even abstract this into a general utility if it makes sense

const getTicketStatusType = (ticketProps) => STATUS_TYPES_MAP[get(ticketProps, 'status')];
```

We can refactor this down to a data utility. And though it's not cutting down the number of imports, I'm perhaps doing a few other useful things:

1.  Cutting down the number of imports from _different_ files
2.  Creating a reusable abstraction -- which I know can be employed elsewhere
3.  De-cluttering `render()` which makes integration tests simpler, possibly unnecessary for some cases since logic can be independently unit tested

That last point is important. At least to me. Untidy `render()` blocks are hard to grok, debug, and test. A lot of the figuring out how to construct and compose the things to render can happen in other places: above the component class definition, in class methods, or in another file. The first options is one I quite like because abstractions don't have to be all that general. It's great if they are localized to the component at hand.

# 4/10/2019
## Starting a new blog and jumping right into an article I read about dependency injection using function parameters
### Tags: python, design patterns 

Read [Ensuring Clean Code: A Look at Python, Parameterized](https://www.toptal.com/python/python-parameterized-design-patterns) this morning. Parameters as DI! So yeah, now that we have default parameters in JavaScript -- as of ES6 -- we can think of parameterized DI for JS too; right there in our function declarations. This is super familiar if you're coming from JS where funcs are first class.
