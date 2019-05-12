Navigate: [Index](/)

# 5/11/2019
## Too many imports
### Tags: javascript, react, refactoring

There are too many imports in this file. I'm staring down like 50 lines of imports. External libraries (React, Lodash, etc...), to our own internal libraries, to components, to helpers, to constants. The last bothers me the most because they feel like implementation details I want hidden away in these other components or helpers.
And as am I'm looking at this statement inside a `render()` block:

`const isSoldOut = this.props.statusType == SOLD_OUT`

I'm suddenly reminded of what @getify told me on twitter a couple weeks ago: "in 'functional programming', we love and embrace functions! functions everywhere!"<sup>[🔗](https://twitter.com/getify/status/1123408796276142080)</sup> That's it, that's my out.

`const isSoldOut = ({status}) => status === SOLD_OUT`

I can refactor this down to a data utility. And though I'm not cutting down the number of imports, I'm perhaps doing a few other useful things:

1.  Cutting down the number of imports from _different_ files
2.  Creating a reusable abstraction -- which I know can be employed elsewhere
3.  De-cluttering `render()` which makes integration tests simpler, possibly unnecessary for some cases since logic can be independently unit tested

That last point is important. At least to me. Untidy `render()` blocks are hard to grok, debug, and test. A lot of the figuring out how to construct and compose the things to render can happen in other places: above the component class definition, in class methods, or in another file. The first options is one I quite like because abstractions don't have to be all that general. It's great if they are localized to the component at hand.

# 4/10/2019
## Starting a new blog
### Tags: python, design patterns

Read [Ensuring Clean Code: A Look at Python, Parameterized](https://www.toptal.com/python/python-parameterized-design-patterns) this morning. Parameters as DI! So yeah, now that we have default parameters in JavaScript -- as of ES6 -- we can think of parameterized DI for JS too; right there in our function declarations. This is super familiar if you're coming from JS where funcs are first class.
