---
title: Flare-On 2019 challenge 8 - Snake for Dummies
layout: single
author_profile: true
#toc_label: Table of Contents
#toc_sticky: true
# categories:
# - CTF Write Ups
date: '2019-12-03 20:30:00'
tags:
- ctf/rev
- writeup
---

Ever since I was 8 years old I thought snake was a game for dummies. To me it seemed more a test of patience than skill, a test I would always fail. But I knew if you were happy to take a scenic route, you could make a robot play the game and you wouldn’t even have to be that smart.

A month ago I was participating in Flare-On, a CTF made for reverse engineers, by cyber security company FireEye. They base their challenges on real-world malware they’ve had to analyse. They like to include a “for fun” challenge and this year’s was to beat a snake game built for the NES.

![](//assets/images/flare-on-snake/press-start.png)

I guess the intended solution for the challenge was to cheat. Learn how the game is coded so you can find a vulnerability and determine the flag. However, I saw an opportunity to make my dream come true. FCEUX is a NES emulator which offers Lua (similar to python) scripting. With Lua I was able to write to arbitrary addresses in memory. And that’s all I needed. The game was simple enough that I only ever read from one or two bytes in the entirety of memory and wrote ever wrote to one byte.

![](//assets/images/flare-on-snake/memory.png)

At the bottom of this post I’ve attached the code I used below, it’s simple enough for anybody with a little programming experience to understand. I even activated “turbo mode” to make it run super fast.

Slow mode
![](//assets/images/flare-on-snake/trimmed-slow-af.gif)

Turbo mode
![](//assets/images/flare-on-snake/fast-and-trimmed.gif)

I learned later that the snake has to eat 25 apples, 4 times in a row to win the game. Fortunately, I left the program running for 10 minutes and came back to the victory flag on the screen.

```lua
RIGHTWALL = 23;
BOTTOMWALL = 21;
STARTING_Y = 11;
DIRECTION = {
  UP = 2,
  DOWN = 3,
  LEFT = 1,
  RIGHT = 0,
};

-- 5 is intended direction
-- 4 is current direction

-- emu.speedmode("turbo");

while (true) do
  currentDirection = memory.readbyte(4)
  currentLength = memory.readbyte(0xA);
  currentX = memory.readbyte(0x7)
  currentY = memory.readbyte(0x8)
  
  -- handle very first move in game
  if currentX == RIGHTWALL - 1 and currentY == STARTING_Y and currentDirection == DIRECTION.RIGHT then
    memory.writebyte(0x5, DIRECTION.DOWN)
  end
  -- handle very first move in loop
  if currentX == RIGHTWALL - 1 and currentY == 0 and currentDirection == DIRECTION.RIGHT then
    memory.writebyte(0x5, DIRECTION.DOWN)
  end

  -- handle going left and back up
  if currentY == BOTTOMWALL - 1 and currentDirection == DIRECTION.DOWN then
    memory.writebyte(0x5, DIRECTION.LEFT)
  end
  if currentY == BOTTOMWALL and currentDirection == DIRECTION.LEFT then
    if currentX ~= 2 then    -- hopefully saviour if there's a bug, input lag
      memory.writebyte(0x5, DIRECTION.UP)
    end
  end

  -- handle going left and back down
  if currentY == 2 and currentDirection == DIRECTION.UP and currentX ~= 0 then
    memory.writebyte(0x5, DIRECTION.LEFT)
  end
  if currentY == 1 and currentDirection == DIRECTION.LEFT then
    memory.writebyte(0x5, DIRECTION.DOWN)
  end


  -- handle going across the roof
  if currentX == 0 and currentY == 1 and currentDirection == DIRECTION.UP then
    memory.writebyte(0x5, DIRECTION.RIGHT)
  end  

  emu.frameadvance();
end;
```

