module.exports = member => {
  const channel = member.guild.channels.find('name', 'g-log');
  if (!channel) return;
  channel.send(`**📤 |** ${member} **Sunucudan çıkış yaptı!**`);
};