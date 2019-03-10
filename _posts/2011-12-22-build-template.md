---
title: Build template
categories:
- Uncategorized
---
I don't like [make](http://en.wikipedia.org/wiki/Make_(software)" title="Make (software)).

The syntax is clunky, the semantics are unintuitive, it's hard to get parallel builds to work well, and there are a million ways to shoot yourself in the foot.

Nevertheless, I stick with it, because it's ubiquitous and it's the simplest solution for what I do.

A simple Makefile might look like this:
```make
all: main

OBJS = \
  Foo.o \
  Bar.o \
  Baz.o

main: $(OBJS)
  $(CXX) $(LDFLAGS) $^ -o $@
```

This says `main` depends on `Foo.o`, `Bar.o`, and `Baz.o`; each of these is built using one of the builtin rules.

I often want some extra build flags for debugging or optimization, so I add:

```make
CFLAGS += -ggdb
CXXFLAGS += -fno-inline
```

If I'm using GCC and I want automatic dependency generation, I add this:

```make
CFLAGS += -MMD -MP
DEP_FILES = $(patsubst %.o,%.d,$(OBJS))
-include $(DEP_FILES)
```

Now whenever I build Foo.o from `Foo.cpp` (or `Foo.c`), g++ will generate Foo.d at the same time.  The next time I type `make`, it will read Foo.d to determine what Foo.o depends on.

And just in case something gets borked, I usually want a `clean` rule:

```make
GENERATED_FILES += $(OBJS)

.PHONY: clean
clean:
  $(RM) $(GENERATED_FILES)
```

Now none of this is intuitive (I learned it all from trial-and-error), and there's a whole lot more that build systems need to do (building shared libraries, finding where libraries are located on a system, etc.), but this really does solve 90% of the problems I hit in small-to-medium projects.  I've even used a setup like this in a medium-large project (> 200K lines of code) with success.

Please, tell me why I should switch?  I despise make just as much as the next guy, but it's simple, and it _works_.

