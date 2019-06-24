# 6/24/2019
## Pre-crude development
### Tags: debugging

This weekend I spotted Julia Evans posting some tips about debugging -- of course a zine followed -- and it resonated deeeply because it touches on one aspect of debugging that I often struggle with. It's comforting to know this is a common kind of struggle!

[https://twitter.com/b0rk/status/1142812831420768257](https://pbs.twimg.com/media/D9wWNfFXoAcsUqq?format=jpg)

Every time we sit down to debug part of a program, we're bringing a worldview to bear about how the program *should* work. Oftentimes this mis-assumption is what makes debugging take time. There's a heated tango between proving out how the code should run in the current environment, with a certain set of data, in a certain test harness, etc... and then the surprises you discover along the way. We unlearn, go back, change course. Maybe rinse repeat.

I think this is just the nature of it. We can't simply throw out all we know at the beginning and re-interrogate every line of code near the point of failure. Ulimately we just need to leverage a great deal of patience.

Just this past week I spent a couple days wrestling with a bug where I was very misdirected by the incorrect assumptions in a failing test itself. In this case I was trying to determine how Selenium's simulated click selection on a dropdown menu was not producing a change in Redux state to activate a purchase button in the page footer. I had made some changes to where the data for the initial values for the dropdown were coming from, so I was tinkering around pretty stuck on figuring out if the data for the dropdown values in the test was wrong. But alas, in the process of reproducing the unexpected behavior and comparing it to the expected behavior on a clean branch, I realized that the dropdown data was fine but there was an incorrect minimum passed to the purchase button component being set farther upstream -- it should have been the minimum from the dropdown values but it was coming from another `minimum` property on the item itself. In this particular scenario, when there is only one item for purchase, the purchase button was supposed to be become activate on load. The test step that selected a value was making an incorrect assumption that selecting a value needed to happen in order to activate the purchase button. While this discovery didn't lead to a solve right away, at the least it corrected my worldview and redirected my attention from the dropdown values to other initial component state and props and how they were affected by changes.


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
