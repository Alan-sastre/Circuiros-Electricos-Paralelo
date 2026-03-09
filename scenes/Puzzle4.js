class Puzzle4 extends Phaser.Scene {
  constructor() {
    super("Puzzle4");
    this.currentStep = 0;
    this.slots = [];
    this.parts = [];
    this.bulbs = [];
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.createAnimatedBackground();
    this.drawBoard();
    this.drawCircuitBase();
    this.createTargets();
    this.createParts();
    this.createGuide();
    this.updateGuide();
  }

  createAnimatedBackground() {
    const g = this.add.graphics().setDepth(-20);
    g.fillGradientStyle(0x111827, 0x1f2937, 0x064e3b, 0x0f172a, 1);
    g.fillRect(0, 0, 1000, 500);
    for (let i = 0; i < 48; i += 1) {
      const dot = this.add.circle(
        Phaser.Math.Between(0, 1000),
        Phaser.Math.Between(0, 500),
        Phaser.Math.Between(2, 5),
        Phaser.Utils.Array.GetRandom([0x22d3ee, 0x60a5fa, 0x4ade80, 0xfacc15]),
        Phaser.Math.FloatBetween(0.15, 0.45),
      );
      dot.setDepth(-19);
      this.tweens.add({
        targets: dot,
        y: dot.y - Phaser.Math.Between(50, 130),
        alpha: 0.06,
        duration: Phaser.Math.Between(2200, 3700),
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
    }
  }

  drawBoard() {
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.2);
    shadow.fillRoundedRect(54, 45, 900, 420, 30);

    const wood = this.add.graphics();
    wood.fillStyle(0xd2ad87, 1);
    wood.fillRoundedRect(45, 35, 910, 430, 28);
    wood.lineStyle(6, 0x8f6a46, 1);
    wood.strokeRoundedRect(45, 35, 910, 430, 28);
    wood.lineStyle(2, 0xe9c7a5, 0.34);
    for (let y = 58; y <= 432; y += 24) {
      wood.strokeLineShape(new Phaser.Geom.Line(70, y, 930, y + Phaser.Math.Between(-3, 3)));
    }

    const board = this.add.graphics();
    board.fillStyle(0x1f4f63, 1);
    board.fillRoundedRect(90, 68, 820, 364, 24);
    board.lineStyle(3, 0x38bdf8, 1);
    board.strokeRoundedRect(90, 68, 820, 364, 24);
    board.fillGradientStyle(0xffffff, 0xffffff, 0xffffff, 0xffffff, 0.05);
    board.fillRoundedRect(108, 84, 784, 130, 16);
  }

  drawCircuitBase() {
    const g = this.add.graphics();

    g.lineStyle(9, 0xf97316, 0.98);
    g.strokeLineShape(new Phaser.Geom.Line(170, 130, 330, 130));
    g.strokeLineShape(new Phaser.Geom.Line(430, 130, 780, 130));
    g.strokeLineShape(new Phaser.Geom.Line(170, 370, 780, 370));

    g.lineStyle(9, 0x38bdf8, 0.98);
    g.strokeLineShape(new Phaser.Geom.Line(170, 130, 170, 370));
    g.strokeLineShape(new Phaser.Geom.Line(780, 130, 780, 185));
    g.strokeLineShape(new Phaser.Geom.Line(780, 315, 780, 370));
    g.strokeLineShape(new Phaser.Geom.Line(620, 130, 620, 170));
    g.strokeLineShape(new Phaser.Geom.Line(620, 230, 620, 370));
    g.strokeLineShape(new Phaser.Geom.Line(700, 130, 700, 270));
    g.strokeLineShape(new Phaser.Geom.Line(700, 330, 700, 370));

    g.lineStyle(3, 0xffffff, 0.3);
    g.strokeLineShape(new Phaser.Geom.Line(170, 126, 330, 126));
    g.strokeLineShape(new Phaser.Geom.Line(430, 126, 780, 126));
    g.strokeLineShape(new Phaser.Geom.Line(170, 366, 780, 366));
    g.strokeLineShape(new Phaser.Geom.Line(174, 130, 174, 370));
    g.strokeLineShape(new Phaser.Geom.Line(624, 130, 624, 170));
    g.strokeLineShape(new Phaser.Geom.Line(624, 230, 624, 370));
    g.strokeLineShape(new Phaser.Geom.Line(704, 130, 704, 270));
    g.strokeLineShape(new Phaser.Geom.Line(704, 330, 704, 370));

    g.fillStyle(0xb87333, 1);
    g.fillRoundedRect(300, 118, 74, 24, 8);
    g.fillRoundedRect(300, 358, 74, 24, 8);
    g.fillRoundedRect(740, 118, 74, 24, 8);
    g.fillRoundedRect(740, 358, 74, 24, 8);
    g.fillStyle(0xf5f6fa, 1);
    g.fillRoundedRect(306, 126, 62, 8, 4);
    g.fillRoundedRect(306, 366, 62, 8, 4);
    g.fillRoundedRect(746, 126, 62, 8, 4);
    g.fillRoundedRect(746, 366, 62, 8, 4);

    g.fillStyle(0x11161c, 1);
    g.fillRoundedRect(138, 205, 40, 95, 10);
    g.fillStyle(0xd63031, 1);
    g.fillRoundedRect(138, 205, 40, 24, 10);
    g.fillStyle(0xffffff, 0.16);
    g.fillRoundedRect(142, 211, 32, 6, 3);
    g.fillStyle(0xced6e0, 1);
    g.fillRoundedRect(150, 194, 16, 11, 3);

    this.bulbs = [this.createBulb(620, 200), this.createBulb(700, 300)];
  }

  createBulb(x, y) {
    const c = this.add.container(x, y);
    const glow = this.add.circle(0, 0, 35, 0xfff176, 0.08);
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.86);
    g.fillCircle(0, 0, 24);
    g.lineStyle(2, 0xc8d6e5, 1);
    g.strokeCircle(0, 0, 24);
    g.fillStyle(0xfff3b0, 0.4);
    g.fillCircle(0, 2, 14);
    g.fillStyle(0xffffff, 0.4);
    g.fillEllipse(-6, -9, 10, 7);
    g.fillStyle(0x6c757d, 1);
    g.fillRoundedRect(-12, 20, 24, 14, 5);
    g.fillStyle(0xadb5bd, 1);
    g.fillRoundedRect(-12, 33, 24, 8, 4);
    c.add([glow, g]);
    c.glow = glow;
    return c;
  }

  createTargets() {
    this.slots = [
      this.createTarget(380, 130, 92, 40, "switchMain"),
      this.createTarget(620, 200, 86, 86, "bulbTop"),
      this.createTarget(700, 300, 86, 86, "bulbBottom"),
      this.createTarget(780, 250, 26, 130, "returnBridge"),
    ];
  }

  createTarget(x, y, w, h, key) {
    const zone = this.add
      .zone(x, y, w + 24, h + 24)
      .setRectangleDropZone(w + 24, h + 24);
    zone.key = key;
    zone.w = w;
    zone.h = h;
    zone.filled = false;
    const g = this.add.graphics();
    g.fillStyle(0x6b7280, 0.24);
    g.fillRoundedRect(x - w / 2, y - h / 2, w, h, 12);
    g.lineStyle(3, 0xfbbf24, 0.6);
    g.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 12);
    zone.visual = g;
    return zone;
  }

  createParts() {
    const p1 = this.createSwitchPart(220, 425, 0x27ae60);
    p1.key = "switchMain";
    p1.homeX = 220;
    p1.homeY = 425;
    this.parts.push(p1);

    const p2 = this.createBulbPart(470, 425);
    p2.key = "bulbTop";
    p2.homeX = 470;
    p2.homeY = 425;
    this.parts.push(p2);

    const p3 = this.createBulbPart(640, 425);
    p3.key = "bulbBottom";
    p3.homeX = 640;
    p3.homeY = 425;
    this.parts.push(p3);

    const p4 = this.createBridgePart(840, 425);
    p4.key = "returnBridge";
    p4.homeX = 840;
    p4.homeY = 425;
    this.parts.push(p4);

    for (let i = 0; i < this.parts.length; i += 1) {
      this.enableDrag(this.parts[i]);
    }
  }

  createSwitchPart(x, y, color) {
    const c = this.add.container(x, y);
    const shadow = this.add.ellipse(0, 24, 58, 12, 0x000000, 0.2);
    const g = this.add.graphics();
    g.fillStyle(0x2f3640, 1);
    g.fillRoundedRect(-42, -14, 84, 28, 10);
    g.fillStyle(color, 1);
    g.fillRoundedRect(-35, -9, 70, 18, 7);
    g.fillStyle(0xecf0f1, 1);
    g.fillRoundedRect(0, -4, 28, 8, 4);
    c.add([shadow, g]);
    c.dragShadow = shadow;
    c.shadowBaseY = shadow.y;
    c.shadowBaseAlpha = 0.2;
    c.setSize(110, 50);
    c.setInteractive({ cursor: "grab" });
    return c;
  }

  createBulbPart(x, y) {
    const c = this.add.container(x, y);
    const shadow = this.add.ellipse(0, 44, 44, 11, 0x000000, 0.2);
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.86);
    g.fillCircle(0, 0, 24);
    g.lineStyle(2, 0xc8d6e5, 1);
    g.strokeCircle(0, 0, 24);
    g.fillStyle(0xfff3b0, 0.4);
    g.fillCircle(0, 2, 14);
    g.fillStyle(0x6c757d, 1);
    g.fillRoundedRect(-12, 20, 24, 14, 5);
    g.fillStyle(0xadb5bd, 1);
    g.fillRoundedRect(-12, 33, 24, 8, 4);
    c.add([shadow, g]);
    c.dragShadow = shadow;
    c.shadowBaseY = shadow.y;
    c.shadowBaseAlpha = 0.2;
    c.setSize(90, 90);
    c.setInteractive({ cursor: "grab" });
    return c;
  }

  createBridgePart(x, y) {
    const c = this.add.container(x, y);
    const shadow = this.add.ellipse(0, 72, 34, 12, 0x000000, 0.2);
    const g = this.add.graphics();
    g.fillStyle(0x101418, 1);
    g.fillRoundedRect(-14, -62, 28, 124, 10);
    g.fillStyle(0x38bdf8, 1);
    g.fillRoundedRect(-12, -60, 24, 120, 8);
    g.lineStyle(2, 0xffffff, 0.35);
    g.strokeRoundedRect(-12, -60, 24, 120, 8);
    g.fillStyle(0xdfe6e9, 1);
    g.fillRoundedRect(-8, -70, 16, 10, 3);
    g.fillRoundedRect(-8, 60, 16, 10, 3);
    c.add([shadow, g]);
    c.dragShadow = shadow;
    c.shadowBaseY = shadow.y;
    c.shadowBaseAlpha = 0.2;
    c.setSize(62, 155);
    c.setInteractive({ cursor: "grab" });
    return c;
  }

  enableDrag(part) {
    this.input.setDraggable(part);
    part.on("pointerdown", () => {
      part.setDepth(30);
      part.scale = 1.04;
      part.prevX = part.x;
      part.prevY = part.y;
      if (part.dragShadow) {
        part.dragShadow.alpha = 0.35;
        part.dragShadow.scaleX = 1.1;
        part.dragShadow.scaleY = 1.1;
      }
    });
    part.on("pointerup", () => {
      part.scale = 1;
      this.resetDragShadow(part);
    });
    this.input.on("drag", (_, gameObject, dragX, dragY) => {
      if (gameObject !== part || part.locked) {
        return;
      }
      const dx = dragX - (gameObject.prevX || dragX);
      const dy = dragY - (gameObject.prevY || dragY);
      gameObject.prevX = dragX;
      gameObject.prevY = dragY;
      if (gameObject.dragShadow) {
        gameObject.dragShadow.x = Phaser.Math.Clamp(-dx * 0.1, -14, 14);
        gameObject.dragShadow.y =
          gameObject.shadowBaseY + Phaser.Math.Clamp(-dy * 0.08, -6, 10);
      }
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on("dragend", (_, gameObject) => {
      if (gameObject !== part || part.locked) {
        return;
      }
      this.resetDragShadow(gameObject);
      this.tryPlace(gameObject);
    });
  }

  resetDragShadow(part) {
    if (!part.dragShadow) {
      return;
    }
    part.dragShadow.x = 0;
    part.dragShadow.y = part.shadowBaseY;
    part.dragShadow.scaleX = 1;
    part.dragShadow.scaleY = 1;
    part.dragShadow.alpha = part.shadowBaseAlpha;
  }

  tryPlace(part) {
    const target = this.slots[this.currentStep];
    const near =
      Phaser.Math.Distance.Between(part.x, part.y, target.x, target.y) < 90;
    if (part.key === target.key && near && !target.filled) {
      target.filled = true;
      part.locked = true;
      part.disableInteractive();
      this.tweens.add({
        targets: part,
        x: target.x,
        y: target.y,
        duration: 240,
        ease: "Back.out",
      });
      if (part.key === "bulbTop") {
        this.activateBulb(0);
      }
      if (part.key === "bulbBottom") {
        this.activateBulb(1);
      }
      this.currentStep += 1;
      this.updateGuide();
      if (this.currentStep === this.slots.length) {
        this.completePuzzle();
      }
      return;
    }
    this.tweens.add({
      targets: part,
      x: part.homeX,
      y: part.homeY,
      duration: 240,
      ease: "Sine.out",
    });
  }

  activateBulb(index) {
    const bulb = this.bulbs[index];
    if (!bulb) {
      return;
    }
    this.tweens.add({
      targets: bulb.glow,
      alpha: 0.7,
      scale: 1.28,
      duration: 340,
      yoyo: true,
      repeat: 3,
    });
  }

  createGuide() {
    this.guide = this.add.text(0, 0, "👆🏻", { fontSize: "48px" }).setDepth(80);
  }

  updateGuide() {
    if (this.guideTween) {
      this.guideTween.stop();
    }
    if (this.guidePulseTween) {
      this.guidePulseTween.stop();
    }
    for (let i = 0; i < this.slots.length; i += 1) {
      this.slots[i].visual.clear();
      this.slots[i].visual.fillStyle(0x6b7280, 0.24);
      this.slots[i].visual.fillRoundedRect(
        this.slots[i].x - this.slots[i].w / 2,
        this.slots[i].y - this.slots[i].h / 2,
        this.slots[i].w,
        this.slots[i].h,
        12,
      );
      this.slots[i].visual.lineStyle(
        3,
        i === this.currentStep ? 0xfbbf24 : 0x7f8c8d,
        i === this.currentStep ? 1 : 0.45,
      );
      this.slots[i].visual.strokeRoundedRect(
        this.slots[i].x - this.slots[i].w / 2,
        this.slots[i].y - this.slots[i].h / 2,
        this.slots[i].w,
        this.slots[i].h,
        12,
      );
    }
    const target = this.slots[this.currentStep];
    const source = this.parts.find(
      (part) => part.key === (target && target.key) && !part.locked,
    );
    if (!target) {
      this.guide.setVisible(false);
      return;
    }
    this.guide.setVisible(true);
    const sourceX = source ? source.x : target.x - 90;
    const sourceY = source ? source.y - 35 : target.y - 35;
    const targetX = target.x - 14;
    const targetY = target.y - target.h / 2 - 50;
    this.guide.setPosition(sourceX, sourceY);
    this.guideTween = this.tweens.add({
      targets: this.guide,
      x: targetX,
      y: targetY,
      duration: 920,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });
    if (source) {
      this.guidePulseTween = this.tweens.add({
        targets: source,
        scale: { from: 1, to: 1.08 },
        duration: 480,
        yoyo: true,
        repeat: -1,
      });
    }
  }

  completePuzzle() {
    this.activateBulb(0);
    this.activateBulb(1);
    this.traceCurrent();
    this.launchConfetti();
    this.time.delayedCall(2900, () => {
      this.scene.start("EndScene");
    });
  }

  traceCurrent() {
    const branches = [
      [
        [170, 130],
        [620, 130],
        [620, 200],
        [620, 370],
        [170, 370],
        [170, 130],
      ],
      [
        [170, 130],
        [700, 130],
        [700, 300],
        [700, 370],
        [170, 370],
        [170, 130],
      ],
    ];

    for (let b = 0; b < branches.length; b += 1) {
      const points = branches[b];
      for (let i = 0; i < points.length - 1; i += 1) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dot = this.add.circle(p1[0], p1[1], 5, 0x22d3ee, 0.95);
        this.tweens.add({
          targets: dot,
          x: p2[0],
          y: p2[1],
          duration: 460,
          delay: b * 620 + i * 330,
          ease: "Linear",
          onComplete: () => dot.destroy(),
        });
      }
    }
  }

  launchConfetti() {
    const colors = [0xff6b6b, 0xfeca57, 0x1dd1a1, 0x54a0ff, 0xff9ff3];
    for (let i = 0; i < 110; i += 1) {
      const x = Phaser.Math.Between(100, 900);
      const y = Phaser.Math.Between(-30, 100);
      const size = Phaser.Math.Between(4, 9);
      const confetti = this.add.rectangle(
        x,
        y,
        size,
        size * 1.8,
        Phaser.Utils.Array.GetRandom(colors),
      );
      confetti.rotation = Phaser.Math.FloatBetween(0, Math.PI);
      this.tweens.add({
        targets: confetti,
        x: x + Phaser.Math.Between(-140, 140),
        y: y + Phaser.Math.Between(260, 520),
        rotation: confetti.rotation + Phaser.Math.FloatBetween(2, 7),
        alpha: 0,
        duration: Phaser.Math.Between(1100, 1800),
        ease: "Quad.in",
        onComplete: () => confetti.destroy(),
      });
    }
  }
}
