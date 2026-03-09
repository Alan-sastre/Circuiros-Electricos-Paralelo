class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.createAnimatedBackground();
    this.drawCelebrationCard();
    this.drawCongratsMessage();
    this.createReplayButton();
    this.createGuide();
    this.launchConfettiBurst();
    this.time.addEvent({
      delay: 1400,
      loop: true,
      callback: () => this.launchConfettiBurst(),
    });
  }

  createAnimatedBackground() {
    const g = this.add.graphics().setDepth(-20);
    g.fillGradientStyle(0x111827, 0x1f2937, 0x0f5132, 0x0a1128, 1);
    g.fillRect(0, 0, 1000, 500);
    for (let i = 0; i < 45; i += 1) {
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
        y: dot.y - Phaser.Math.Between(60, 140),
        alpha: 0.05,
        duration: Phaser.Math.Between(2400, 3800),
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
    }
  }

  drawCelebrationCard() {
    const glow = this.add.graphics();
    glow.fillStyle(0x38bdf8, 0.2);
    glow.fillRoundedRect(120, 72, 760, 356, 40);

    const card = this.add.graphics();
    card.fillStyle(0x0b1220, 0.82);
    card.fillRoundedRect(130, 80, 740, 340, 36);
    card.lineStyle(4, 0x22d3ee, 0.9);
    card.strokeRoundedRect(130, 80, 740, 340, 36);

    this.add.text(500, 235, "✨", { fontSize: "64px" }).setOrigin(0.5);
  }

  drawCongratsMessage() {
    this.add
      .text(500, 112, "¡FELICITACIONES!", {
        fontFamily: "Arial Black",
        fontSize: "52px",
        color: "#fde68a",
        stroke: "#1f2937",
        strokeThickness: 8,
      })
      .setOrigin(0.5);
    this.add
      .text(500, 155, "COMPLETASTE TODOS LOS PUZZLES", {
        fontFamily: "Arial Black",
        fontSize: "24px",
        color: "#dbeafe",
        stroke: "#0f172a",
        strokeThickness: 5,
      })
      .setOrigin(0.5);
  }

  createReplayButton() {
    this.replayBtn = this.add.container(500, 360);
    const bg = this.add.circle(0, 0, 52, 0x27ae60, 1);
    const ring = this.add.circle(0, 0, 60);
    ring.setStrokeStyle(5, 0x2ecc71, 0.8);
    const icon = this.add.text(0, 0, "🔁", { fontSize: "44px" }).setOrigin(0.5);
    this.replayBtn.add([bg, ring, icon]);
    this.replayBtn.setSize(130, 130);
    this.replayBtn.setInteractive({ cursor: "pointer" });

    this.replayBtn.on("pointerover", () => {
      this.tweens.add({
        targets: this.replayBtn,
        scale: 1.08,
        duration: 120,
      });
    });

    this.replayBtn.on("pointerout", () => {
      this.tweens.add({
        targets: this.replayBtn,
        scale: 1,
        duration: 120,
      });
    });

    this.replayBtn.on("pointerdown", () => {
      this.tweens.add({
        targets: this.replayBtn,
        scale: 0.92,
        duration: 90,
        yoyo: true,
      });
      this.scene.start("Puzzle1");
    });
  }

  createGuide() {
    const hand = this.add.text(this.replayBtn.x - 14, this.replayBtn.y - 88, "👆🏻", { fontSize: "50px" });
    this.tweens.add({
      targets: hand,
      y: hand.y + 18,
      duration: 560,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });
  }

  launchConfettiBurst() {
    const colors = [0xff6b6b, 0xfeca57, 0x1dd1a1, 0x54a0ff, 0xff9ff3];
    for (let i = 0; i < 70; i += 1) {
      const x = Phaser.Math.Between(120, 880);
      const y = Phaser.Math.Between(-20, 120);
      const confetti = this.add.rectangle(
        x,
        y,
        Phaser.Math.Between(4, 9),
        Phaser.Math.Between(8, 16),
        Phaser.Utils.Array.GetRandom(colors),
      );
      confetti.rotation = Phaser.Math.FloatBetween(0, Math.PI);
      this.tweens.add({
        targets: confetti,
        x: x + Phaser.Math.Between(-130, 130),
        y: y + Phaser.Math.Between(260, 480),
        rotation: confetti.rotation + Phaser.Math.FloatBetween(2, 7),
        alpha: 0,
        duration: Phaser.Math.Between(950, 1600),
        ease: "Quad.in",
        onComplete: () => confetti.destroy(),
      });
    }
  }
}
