class Puzzle2 extends Phaser.Scene {
  constructor() {
    super("Puzzle2");
    this.currentStep = 0;
    this.targets = [];
    this.parts = [];
    this.fixedBulbs = [];
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.createAnimatedBackground();
    this.drawPanel();
    this.drawCircuitFrame();
    this.createTargets();
    this.createParts();
    this.createGuide();
    this.updateGuide();
  }

  createAnimatedBackground() {
    const g = this.add.graphics().setDepth(-20);
    g.fillGradientStyle(0x1b263b, 0x0f4c5c, 0x1b4332, 0x0b132b, 1);
    g.fillRect(0, 0, 1000, 500);
    for (let i = 0; i < 42; i += 1) {
      const dot = this.add.circle(
        Phaser.Math.Between(0, 1000),
        Phaser.Math.Between(0, 500),
        Phaser.Math.Between(2, 5),
        Phaser.Utils.Array.GetRandom([0x22d3ee, 0x60a5fa, 0x4ade80, 0xf59e0b]),
        Phaser.Math.FloatBetween(0.18, 0.45),
      );
      dot.setDepth(-19);
      this.tweens.add({
        targets: dot,
        y: dot.y - Phaser.Math.Between(50, 120),
        alpha: 0.06,
        duration: Phaser.Math.Between(2400, 3800),
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
    }
  }

  drawPanel() {
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.2);
    shadow.fillRoundedRect(54, 45, 900, 420, 30);

    const wood = this.add.graphics();
    wood.fillStyle(0xd4b08a, 1);
    wood.fillRoundedRect(45, 35, 910, 430, 28);
    wood.lineStyle(6, 0x89633f, 1);
    wood.strokeRoundedRect(45, 35, 910, 430, 28);
    wood.lineStyle(2, 0xe9c7a5, 0.32);
    for (let y = 58; y <= 432; y += 24) {
      wood.strokeLineShape(new Phaser.Geom.Line(70, y, 930, y + Phaser.Math.Between(-3, 3)));
    }

    const board = this.add.graphics();
    board.fillStyle(0x203a43, 1);
    board.fillRoundedRect(105, 70, 790, 360, 24);
    board.lineStyle(3, 0x2c5364, 1);
    board.strokeRoundedRect(105, 70, 790, 360, 24);
    board.fillGradientStyle(0xffffff, 0xffffff, 0xffffff, 0xffffff, 0.06);
    board.fillRoundedRect(120, 84, 760, 120, 14);
  }

  drawCircuitFrame() {
    const g = this.add.graphics();
    for (let x = 132; x <= 868; x += 22) {
      for (let y = 96; y <= 404; y += 20) {
        g.fillStyle(0xe5e7eb, 0.9);
        g.fillCircle(x, y, 2);
      }
    }
    g.fillStyle(0xd1d5db, 0.9);
    g.fillRoundedRect(116, 190, 772, 18, 8);
    g.fillRoundedRect(116, 292, 772, 18, 8);

    g.lineStyle(8, 0xd35400, 0.95);
    g.strokeLineShape(new Phaser.Geom.Line(330, 140, 760, 140));
    g.strokeLineShape(new Phaser.Geom.Line(330, 360, 760, 360));
    g.lineStyle(8, 0x3b82f6, 0.95);
    g.strokeLineShape(new Phaser.Geom.Line(330, 140, 330, 360));
    g.strokeLineShape(new Phaser.Geom.Line(560, 140, 560, 360));
    g.strokeLineShape(new Phaser.Geom.Line(700, 140, 700, 360));
    g.strokeLineShape(new Phaser.Geom.Line(760, 140, 760, 360));

    g.lineStyle(3, 0xffffff, 0.35);
    g.strokeLineShape(new Phaser.Geom.Line(330, 136, 760, 136));
    g.strokeLineShape(new Phaser.Geom.Line(330, 356, 760, 356));
    g.strokeLineShape(new Phaser.Geom.Line(334, 140, 334, 360));
    g.strokeLineShape(new Phaser.Geom.Line(564, 140, 564, 360));
    g.strokeLineShape(new Phaser.Geom.Line(704, 140, 704, 360));
    g.strokeLineShape(new Phaser.Geom.Line(764, 140, 764, 360));

    g.fillStyle(0xb87333, 1);
    g.fillRoundedRect(470, 128, 82, 24, 8);
    g.fillRoundedRect(470, 348, 82, 24, 8);
    g.fillRoundedRect(640, 128, 82, 24, 8);
    g.fillRoundedRect(640, 348, 82, 24, 8);
    g.fillStyle(0xf5f6fa, 1);
    g.fillRoundedRect(476, 136, 70, 8, 4);
    g.fillRoundedRect(476, 356, 70, 8, 4);
    g.fillRoundedRect(646, 136, 70, 8, 4);
    g.fillRoundedRect(646, 356, 70, 8, 4);
    g.fillStyle(0xe1b12c, 1);
    g.fillRect(485, 135, 6, 10);
    g.fillStyle(0xc23616, 1);
    g.fillRect(502, 135, 6, 10);
    g.fillStyle(0x2f3640, 1);
    g.fillRect(518, 135, 6, 10);
    g.fillStyle(0x44bd32, 1);
    g.fillRect(485, 355, 6, 10);
    g.fillStyle(0x273c75, 1);
    g.fillRect(502, 355, 6, 10);
    g.fillStyle(0x2f3640, 1);
    g.fillRect(518, 355, 6, 10);
    g.fillStyle(0xe1b12c, 1);
    g.fillRect(655, 135, 6, 10);
    g.fillStyle(0xc23616, 1);
    g.fillRect(672, 135, 6, 10);
    g.fillStyle(0x2f3640, 1);
    g.fillRect(688, 135, 6, 10);
    g.fillStyle(0x44bd32, 1);
    g.fillRect(655, 355, 6, 10);
    g.fillStyle(0x273c75, 1);
    g.fillRect(672, 355, 6, 10);
    g.fillStyle(0x2f3640, 1);
    g.fillRect(688, 355, 6, 10);

    this.fixedBulbs = [this.createFixedBulb(560, 250), this.createFixedBulb(700, 250)];
  }

  createFixedBulb(x, y) {
    const c = this.add.container(x, y);
    const glow = this.add.circle(0, 0, 34, 0xfff176, 0.08);
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.86);
    g.fillCircle(0, 0, 24);
    g.lineStyle(2, 0xc8d6e5, 1);
    g.strokeCircle(0, 0, 24);
    g.fillStyle(0xfff3b0, 0.36);
    g.fillCircle(0, 2, 14);
    g.fillStyle(0xffffff, 0.4);
    g.fillEllipse(-6, -9, 10, 7);
    g.fillStyle(0x6c757d, 1);
    g.fillRoundedRect(-12, 20, 24, 15, 5);
    g.fillStyle(0xadb5bd, 1);
    g.fillRoundedRect(-12, 33, 24, 8, 4);
    c.add([glow, g]);
    c.glow = glow;
    return c;
  }

  createTargets() {
    this.targets = [
      this.createTarget(290, 250, 70, 120, "battery"),
      this.createTarget(560, 250, 80, 80, "bulb1"),
      this.createTarget(700, 250, 80, 80, "bulb2"),
    ];
  }

  createTarget(x, y, w, h, key) {
    const zone = this.add
      .zone(x, y, w + 20, h + 20)
      .setRectangleDropZone(w + 20, h + 20);
    zone.key = key;
    zone.w = w;
    zone.h = h;
    zone.filled = false;

    const g = this.add.graphics();
    g.fillStyle(0x7f8c8d, 0.18);
    g.fillRoundedRect(x - w / 2, y - h / 2, w, h, 16);
    g.lineStyle(3, 0x00a8ff, 0.5);
    g.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 16);
    zone.visual = g;
    return zone;
  }

  createParts() {
    const battery = this.createBattery(210, 410);
    battery.key = "battery";
    battery.homeX = 210;
    battery.homeY = 410;
    this.parts.push(battery);

    const bulb1 = this.createBulbItem(470, 410);
    bulb1.key = "bulb1";
    bulb1.homeX = 470;
    bulb1.homeY = 410;
    this.parts.push(bulb1);

    const bulb2 = this.createBulbItem(730, 410);
    bulb2.key = "bulb2";
    bulb2.homeX = 730;
    bulb2.homeY = 410;
    this.parts.push(bulb2);

    for (let i = 0; i < this.parts.length; i += 1) {
      this.enableDrag(this.parts[i]);
    }
  }

  createBattery(x, y) {
    const c = this.add.container(x, y);
    const shadow = this.add.ellipse(0, 58, 54, 12, 0x000000, 0.2);
    const g = this.add.graphics();
    g.fillStyle(0x11161c, 1);
    g.fillRoundedRect(-30, -48, 60, 96, 12);
    g.fillStyle(0xd63031, 1);
    g.fillRoundedRect(-30, -48, 60, 26, 12);
    g.fillStyle(0x2d3436, 1);
    g.fillRoundedRect(-24, -16, 48, 54, 10);
    g.fillStyle(0x00cec9, 0.75);
    g.fillRoundedRect(-22, -10, 44, 12, 5);
    g.fillStyle(0xced6e0, 1);
    g.fillRoundedRect(-10, -56, 20, 10, 3);
    g.fillStyle(0xff6b6b, 1);
    g.fillCircle(16, -43, 4);
    g.fillStyle(0x2d3436, 1);
    g.fillCircle(16, 41, 4);
    g.fillStyle(0x95a5a6, 1);
    g.fillRoundedRect(-11, 46, 22, 8, 3);
    c.add([shadow, g]);
    c.dragShadow = shadow;
    c.shadowBaseY = shadow.y;
    c.shadowBaseAlpha = 0.2;
    c.setSize(80, 130);
    c.setInteractive({ cursor: "grab" });
    return c;
  }

  createBulbItem(x, y) {
    const c = this.add.container(x, y);
    const shadow = this.add.ellipse(0, 44, 44, 11, 0x000000, 0.2);
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.85);
    g.fillCircle(0, -5, 27);
    g.lineStyle(2, 0xc8d6e5, 1);
    g.strokeCircle(0, -5, 27);
    g.fillStyle(0xffeaa7, 0.38);
    g.fillCircle(0, -2, 15);
    g.fillStyle(0x6c757d, 1);
    g.fillRoundedRect(-13, 17, 26, 17, 6);
    g.fillStyle(0xadb5bd, 1);
    g.fillRoundedRect(-14, 33, 28, 11, 4);
    c.add([shadow, g]);
    c.dragShadow = shadow;
    c.shadowBaseY = shadow.y;
    c.shadowBaseAlpha = 0.2;
    c.setSize(90, 90);
    c.setInteractive({ cursor: "grab" });
    return c;
  }

  enableDrag(part) {
    this.input.setDraggable(part);

    part.on("pointerdown", () => {
      part.setDepth(20);
      part.scale = 1.04;
      part.prevX = part.x;
      part.prevY = part.y;
      if (part.dragShadow) {
        part.dragShadow.alpha = 0.34;
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
    const target = this.targets[this.currentStep];
    const near =
      Phaser.Math.Distance.Between(part.x, part.y, target.x, target.y) < 90;
    const rightPart = part.key === target.key;

    if (near && rightPart && !target.filled) {
      target.filled = true;
      part.locked = true;
      part.disableInteractive();
      this.tweens.add({
        targets: part,
        x: target.x,
        y: target.y,
        duration: 220,
        ease: "Back.out",
      });
      if (part.key.indexOf("bulb") === 0) {
        this.pulseLight(part.x, part.y - 5);
      }
      this.currentStep += 1;
      this.updateGuide();
      if (this.currentStep === this.targets.length) {
        this.completePuzzle();
      }
      return;
    }

    this.tweens.add({
      targets: part,
      x: part.homeX,
      y: part.homeY,
      duration: 220,
      ease: "Sine.out",
    });
  }

  createGuide() {
    this.guide = this.add.text(0, 0, "👆🏻", { fontSize: "48px" }).setDepth(60);
  }

  updateGuide() {
    if (this.guideTween) {
      this.guideTween.stop();
    }
    if (this.guidePulseTween) {
      this.guidePulseTween.stop();
    }
    for (let i = 0; i < this.targets.length; i += 1) {
      this.targets[i].visual.clear();
      this.targets[i].visual.fillStyle(0x7f8c8d, 0.18);
      this.targets[i].visual.fillRoundedRect(
        this.targets[i].x - this.targets[i].w / 2,
        this.targets[i].y - this.targets[i].h / 2,
        this.targets[i].w,
        this.targets[i].h,
        16,
      );
      this.targets[i].visual.lineStyle(
        3,
        i === this.currentStep ? 0x00a8ff : 0x7f8c8d,
        i === this.currentStep ? 1 : 0.45,
      );
      this.targets[i].visual.strokeRoundedRect(
        this.targets[i].x - this.targets[i].w / 2,
        this.targets[i].y - this.targets[i].h / 2,
        this.targets[i].w,
        this.targets[i].h,
        16,
      );
    }

    const target = this.targets[this.currentStep];
    const source = this.parts.find(
      (part) => part.key === (target && target.key) && !part.locked,
    );
    if (target) {
      const sourceX = source ? source.x : target.x - 85;
      const sourceY = source ? source.y - 35 : target.y - 35;
      const targetX = target.x - 14;
      const targetY = target.y - target.h / 2 - 46;

      this.guide.setPosition(sourceX, sourceY);
      this.guideTween = this.tweens.add({
        targets: this.guide,
        x: targetX,
        y: targetY,
        duration: 900,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
      if (source) {
        this.guidePulseTween = this.tweens.add({
          targets: source,
          scale: { from: 1, to: 1.08 },
          duration: 450,
          yoyo: true,
          repeat: -1,
        });
      }
    } else {
      this.guide.setVisible(false);
    }
  }

  pulseLight(x, y) {
    const glow = this.add.circle(x, y, 24, 0xfff176, 0.45);
    this.tweens.add({
      targets: glow,
      scale: 1.5,
      alpha: 0,
      duration: 500,
      ease: "Quad.out",
      onComplete: () => glow.destroy(),
    });
  }

  completePuzzle() {
    this.lightBulbs();
    this.traceCurrent();
    this.launchConfetti();
    this.time.delayedCall(2600, () => {
      this.scene.start("Puzzle3");
    });
  }

  lightBulbs() {
    for (let i = 0; i < this.fixedBulbs.length; i += 1) {
      const bulb = this.fixedBulbs[i];
      this.tweens.add({
        targets: bulb.glow,
        alpha: 0.68,
        scale: 1.26,
        duration: 320,
        yoyo: true,
        repeat: 4,
      });
    }
  }

  traceCurrent() {
    const branches = [
      [
        [330, 140],
        [560, 140],
        [560, 360],
        [330, 360],
        [330, 140],
      ],
      [
        [330, 140],
        [700, 140],
        [700, 360],
        [330, 360],
        [330, 140],
      ],
    ];

    for (let b = 0; b < branches.length; b += 1) {
      const points = branches[b];
      for (let i = 0; i < points.length - 1; i += 1) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dot = this.add.circle(p1[0], p1[1], 5, 0x00d2d3, 0.95);
        this.tweens.add({
          targets: dot,
          x: p2[0],
          y: p2[1],
          duration: 420,
          delay: b * 520 + i * 300,
          ease: "Linear",
          onComplete: () => dot.destroy(),
        });
      }
    }
  }

  launchConfetti() {
    const colors = [0xff6b6b, 0xfeca57, 0x1dd1a1, 0x54a0ff, 0xff9ff3];
    for (let i = 0; i < 90; i += 1) {
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
        x: x + Phaser.Math.Between(-120, 120),
        y: y + Phaser.Math.Between(260, 520),
        rotation: confetti.rotation + Phaser.Math.FloatBetween(2, 7),
        alpha: 0,
        duration: Phaser.Math.Between(1000, 1700),
        ease: "Quad.in",
        onComplete: () => confetti.destroy(),
      });
    }
  }
}
